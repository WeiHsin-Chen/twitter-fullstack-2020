const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const helpers = require('../_helpers')

const tweetController = require('../controllers/api/tweetController')
const userController = require('../controllers/api/userController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (helpers.getUser(req).role === 'admin') {
      req.flash('error_messages', '管理員請由後台登入')
    }
    return next()
  }
  res.redirect('/signin')
}

//twitter's modal
router.get('/tweets/:id/replies', authenticated, tweetController.getTweetModal)

//user's profile
router.get('/users/:id', authenticated, userController.getUser)
router.post('/users/:id', authenticated, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), userController.putUserEdit)

module.exports = router