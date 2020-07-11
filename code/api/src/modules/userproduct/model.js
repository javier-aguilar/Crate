'use strict'

//UserProduct
module.exports = function(sequelize, DataTypes) {
  let UserProduct = sequelize.define('userproducts', {
    userId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
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
