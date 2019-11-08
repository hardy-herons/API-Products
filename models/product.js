"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      slogan: DataTypes.STRING,
      description: DataTypes.STRING(1234),
      category: DataTypes.STRING,
      default_price: DataTypes.DECIMAL(10, 2)
    },
    { timestamps: false }
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
