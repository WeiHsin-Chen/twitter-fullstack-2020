'use strict';
const faker = require('faker')
const db = require('../models')
const User = db.User

const getUserId = new Promise((resolve, reject) => {
  User.findAll({ raw: true, nest: true })
    .then(users => {
      const userIds = []
      users.forEach(user => {
        userIds.push(user.id)
      })
      return resolve(userIds)
    })
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await getUserId

    await queryInterface.bulkInsert('Tweets',
      Array.from({ length: 10 }).map((d, i) =>
      ({
        UserId: userIds[Math.floor(Math.random() * userIds.length)],
        content: faker.lorem.text(),
        createdAt: new Date(),
        updatedAt: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tweets', null, {})
  }
};
