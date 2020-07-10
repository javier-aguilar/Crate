'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userproducts', [
      {
        userId: 2,
        productId: 1,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 3,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 5,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
      },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userproducts', null, {});
  }
}
