"use strict";
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define(
    "Style",
    {
      productId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      default_style: DataTypes.INTEGER
    },
    {}
  );
  Style.associate = function(models) {
    // associations can be defined here
  };
  return Style;
};
