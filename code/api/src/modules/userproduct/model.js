'use strict'

//UserProduct
module.exports = function(sequelize, DataTypes) {
  let UserProduct = sequelize.define('UserProduct', {
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

  UserProduct.associate = (models) => {
    UserProduct.belongsTo(models.Product)
    UserProduct.belongsTo(models.User)
  };

  return UserProduct;
};
