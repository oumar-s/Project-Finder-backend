"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
   const Project = sequelize.define("Project", {
    projectTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectDescription: {
        type: DataTypes.STRING,
    }
   })

   Project.associate = (models) => {
    // associations can be defined here
    // user belongs to Textbook through Textbook's ownerID
    Project.belongsTo(models.User, {
        foreignKey: "ownerID",
        as: "owner",
      });
};

   return Project
}
