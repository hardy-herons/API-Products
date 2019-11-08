"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slogan: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1234)
      },
      category: {
        type: Sequelize.STRING
      },
      default_price: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  }
};
