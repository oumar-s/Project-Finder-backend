"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProjectRequest = sequelize.define("ProjectRequest", {
        status: { //Pending, Accepted, Rejected
            type: DataTypes.STRING,
            default: 'Pending'
        },
    });

    ProjectRequest.associate = function (models) {
        // associations can be defined here
        ProjectRequest.belongsTo(models.User, {
            foreignKey: "userID",
            as: "user",
        });
        
        ProjectRequest.belongsTo(models.Project, {
            foreignKey: "projectID",
            as: "project",
        });
    };

    return ProjectRequest
}