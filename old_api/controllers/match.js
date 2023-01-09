const profile = require('../models/profile');
const interet_relation = require('../models/interet_relation')
const localisation = require('../models/localisation')
const question_relation = require('../models/question_relation')
const recherche = require('../models/recherche')
const match = require('../models/match')
const contact = require('../models/contact')





exports.findMatch = (req, res, next) => {
    var id = req.params.id
    if (id === undefined){
        res.status(400).json({message: 'id manquant'})
    }
    match.findMatchList(id)
    .then(response => {res.status(200).json(response);})
    
}

exports.addLike = (req, res, next) => {
    match.addLike(req.body.user_id, req.body.target_id, req.body.type)
    .then(response => {
        // tester si l'utilisateur a été liké par la cible
        match.testMatch(req.body.user_id, req.body.target_id)
        .then(match => {
            if (match != false) {
                contact.addContact(req.body.user_id, req.body.target_id)
                contact.addContact(req.body.target_id, req.body.user_id)
            }
            res.status(200).json(response);
        })
        // .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
} 