'use strict'

// User
// defining a user with certain attributes
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    // this sets up a relationship with users and subscriptions
    User.hasMany(models.Subscription)
  }

  return User
}
