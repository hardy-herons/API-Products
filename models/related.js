"use strict";
module.exports = (sequelize, DataTypes) => {
  const Related = sequelize.define(
    "Related",
    {
      current_product_id: DataTypes.INTEGER,
      related_product_id: DataTypes.INTEGER
    },
    { freezeTableName: true, timestamps: false }
  );
  Related.associate = function(models) {
    // associations can be defined here
  };
  return Related;
};
