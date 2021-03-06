"use strict";
module.exports = (sequelize, DataTypes) => {
  const SKU = sequelize.define(
    "SKU",
    {
      styleId: DataTypes.INTEGER,
      size: DataTypes.STRING,
      quantity: DataTypes.INTEGER
    },
    { timestamps: false }
  );
  SKU.associate = function(models) {
    // associations can be defined here
  };
  return SKU;
};
