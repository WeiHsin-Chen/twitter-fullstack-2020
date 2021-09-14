const db = require('../models')
const User = db.User

const twitterController = {
  getTwitters: (req, res) => {
    return res.render('twitter', { layout: 'main' })
  },
}

module.exports = twitterController