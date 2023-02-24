'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PageData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageTitle: {
        type: Sequelize.STRING
      },
      pageNo: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      user: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'user',
          key: 'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PageData');
  }
};