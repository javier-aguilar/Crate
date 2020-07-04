
// MIGRATION IS A SET OF INSTRUCTIONS TO DO SOMETHING TO THE DATABASE
module.exports = {
  // UP - DOES THESE THINGS WHEN MIGRATION IS RUN
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      // CREATES A TABLE WITH ATTRIBUTES AND ENTRIES
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
  down: (queryInterface, Sequelize) => {
    // DOWN - REVERSES THE THINGS DONE WHEN MIGRATION IS DONE
    return queryInterface.dropTable('users');
    // 'USERS' IS THE NAME OF THE TABLE
  }
}
