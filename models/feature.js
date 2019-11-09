'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define('Feature', {
    product_id: DataTypes.INTEGER,
    feature: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  Feature.associate = function(models) {
    // associations can be defined here
  };
  return Feature;
};