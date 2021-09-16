const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/userController')
const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/users/signup')
}

// user register
router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)

// user login
router.get('/login', userController.getLogin)
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), userController.postLogin)
router.get('/logout', userController.logout)

//user's profile
router.get('/self/:id', authenticated, userController.getUser)
router.get('/self/reply/:id', authenticated, userController.getUserReply)
router.get('/self/like/:id', authenticated, userController.getUserLike)


module.exports = router