"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProjectMember = sequelize.define("ProjectMember", {
        
    });

    ProjectMember.associate = (models) => {
        ProjectMember.belongsTo(models.User, {
            foreignKey: "userID",
            as: "member",
        });

        ProjectMember.belongsTo(models.Project, {
            foreignKey: "projectID",
            as: "project",
        });
    };

    return ProjectMember
}