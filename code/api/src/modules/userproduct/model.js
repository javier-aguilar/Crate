'use strict'

//UserProduct
module.exports = function(sequelize, DataTypes) {
  let UserProduct = sequelize.define('userproducts', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'userId',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'productId',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    kept: {
      type: DataTypes.BOOLEAN
    }
  })

  // UserProduct.associate = function(models) {
  //   UserProduct.belongsTo(models.User)
  //   UserProduct.belongsTo(models.Product)
  // }

  return UserProduct;
};
