module.exports = {
  // up: Does these things when the migration is run
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      // create table: creates a table with attributes and entries.
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // down: reverses what was done by the migration
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
}
