'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    // DEFINING A USER WITH CERTAIN ATTRIBUTES
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
    User.hasMany(models.Subscription)
    // USER HAS MANY RELATIONSHIP WITH SUBSCRIPTIONS
  }

  return User
}
