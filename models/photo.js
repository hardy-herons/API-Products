"use strict";
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    "Photo",
    {
      styleId: DataTypes.INTEGER,
      url: DataTypes.STRING(1234),
      thumbnail_url: DataTypes.STRING(1234)
    },
    { timestamps: false }
  );
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};
