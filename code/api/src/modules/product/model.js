'use strict'

// Product
module.exports = function(sequelize, DataTypes) {
  let Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })

Product.associate = (models) => {
  Product.belongsToMany(models.User, {
    through: models.UserProduct,
    as: 'users',
    foreignKey: 'productId'
  });
};

return Product;

};
