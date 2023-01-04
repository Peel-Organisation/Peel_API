const bcrypt  = require('bcrypt');
const model = require('../models/user');
const interet_relation = require('../models/old/interet_relation')
const localisation = require('../models/old/localisation')
const profile = require('../models/old/profile')
const question_relation = require('../models/old/question_relation')
const recherche = require('../models/old/recherche')

const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
  //fix de l'ajout d'un email existant
  //création des valeurs dans les autres tables 
  console.log(req.body.email)
  if (req.body.email === undefined || req.body.password === undefined){
    res.status(400).json({message: 'email ou mot de passe manquant'})
  }

  model.getUserByEmail(req.body.email)
  .then(user => {
    console.log(user)
    if (user[0] === undefined){
      bcrypt.hash(req.body.password, 10)
          .then(hash => {
              model.addUser(req.body.email,hash)
              .then(create => {recherche.addRecherche(create.insertId)
                .then(() => {localisation.addLocalisation(create.insertId)
                  .then(() => {profile.addProfile(create.insertId)
                    .then(() => {question_relation.addQuestion_Relation(create.insertId, 3)
                      .then(() => {interet_relation.addInteret_Relation(create.insertId, 5) 
                        .then ( res.status(200).json({
                          userId: create.insertId,
                          token: jwt.sign(
                            { userId: create.insertId },
                            "SECURITY_KEY",
                            { expiresIn: '24h' }
                            ),
                          message:"utilisateur créé avec succés"
                        }))
                        .catch(error => res.status(400).json({ error }));
                      })
                      .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(400).json({ error }));
                  })
                  .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(400).json({ error }));
              })
              .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
        } else { res.status(400).json({message: 'email déja utilisé'})}
  })
  .catch(error => res.status(500).json({error}));
  
    // var user = model.getUserByEmail(req.body.email)
    // .then(console.log(user.id))
    
    // interet_relation.addInteret_Relation(user.id);
};

exports.login = (req, res, next) => {
  model.getUserByEmail(req.body.email)
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user[0].id,
            token: jwt.sign(
              { userId: user[0].id },
              "SECURITY_KEY",
              { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.protected = (req, res, next) => {
  console.log(req);
  res.status(200).json({message: "Vous êtes connecté"})
};