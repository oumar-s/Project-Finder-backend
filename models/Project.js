"use strict";

module.exports = (sequelize, DataTypes) => {
   const Project = sequelize.define("Project", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    }
   })

   return Project
}
