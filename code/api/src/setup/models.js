// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

const models = {
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model'),
  UserProduct: databaseConnection.import('../modules/userproduct/model')
}

// Object.keys(models).forEach(modelName => {
//   if (models[modelName].associate) {
//     models[modelName].associate(models)
//   }
// })
models.UserProduct.associate = function(models) {
  UserProduct.belongsTo(models.User, { foreignKey: 'id'})
  UserProduct.belongsTo(models.Product)
}

models.User.associate = function(models) {
  User.hasMany(models.Subscription, {as: 'subscriptions'}),
  User.hasMany(models.UserProduct, { foreginKey: 'userId', sourceKey: 'id'} )
  User.hasMany(models.Product, {as: 'products', through: models.UserProduct})
}

models.Subscription.associate = function(models) {
  Subscription.belongsTo(models.User, {foreignKey: 'userId', as: 'user'}),
  Subscription.belongsTo(models.Crate, {foreginKey: 'crateId', as: 'crate'})
}

models.Product.associate = function(models) {
  Product.hasMany(models.UserProduct)
  Product.belongsToMany(models.User, {through: models.UserProduct})
}

models.Crate.associate = function(models) {
  Crate.hasMany(models.Subscription)
}

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
