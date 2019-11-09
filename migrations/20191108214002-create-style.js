"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Styles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sale_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true
      },
      original_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true
      },
      default_style: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Styles");
  }
};
