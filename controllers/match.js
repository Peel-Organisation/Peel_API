const profile = require('../models/old/profile');
const interet_relation = require('../models/old/interet_relation')
const localisation = require('../models/old/localisation')
const question_relation = require('../models/old/question_relation')
const recherche = require('../models/old/recherche')
const match = require('../models/old/match')
const contact = require('../models/old/contact')





exports.findMatch = (req, res, next) => {
    var id = req.params.id
    match.findMatchList(id)
    .then(response => {res.status(200).json(response);})
    
}

exports.addLike = (req, res, next) => {
    console.log(req.body)
    match.addLike(req.body.user_id, req.body.target_id, req.body.type)
    .then(response => {
        // tester si l'utilisateur a été liké par la cible
        match.testMatch(req.body.user_id, req.body.target_id)
        .then(match => {
            if (match != false) {
                contact.addContact(req.body.user_id, req.body.target_id)
                contact.addContact(req.body.target_id, req.body.user_id)
            }
            console.log(match)
            res.status(200).json(response);
        })
        // .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}