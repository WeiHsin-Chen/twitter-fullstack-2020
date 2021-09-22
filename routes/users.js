const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const helpers = require('../_helpers')
const userController = require('../controllers/userController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


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
router.put('/self/edit/:id', authenticated, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), userController.putUserEdit)
router.get('/self/:id', authenticated, userController.getUser)
router.get('/self/reply/:id', authenticated, userController.getUserReply)
router.get('/self/like/:id', authenticated, userController.getUserLike)
router.get('/self/follower/:id', authenticated, userController.getUserFollower)
router.get('/self/following/:id', authenticated, userController.getUserFollowing)


// user's setting
router.get('/setting/:id', authenticated, userController.getUserSetting)
router.put('/setting/:id', authenticated, userController.putUserSetting)

module.exports = router