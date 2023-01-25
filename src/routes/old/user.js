const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');




const userController = require('../../controllers/old/user');

// router.post('/signup', 
//         body('email')
//         .isEmail()
//         .custom(value => {
//             return User.findUserByEmail(value).then(user => {
//                 if (user) {
//                     return Promise.reject('E-mail already in use ', user);
//                 }
//             });
//         })
//         .withMessage('Invalid pawword'),
//         body('password')
//         .isLength({ min: 5 })
//         .matches(/\d/)
//         .withMessage('Invalid pawword'),
//         userController.register
//     );

router.post('/signup',  
        body('email').isEmail(),
        userController.register
    );
router.post('/signin', 
        userController.login
    );

router.get("/protected", auth, userController.protected);

module.exports = router;