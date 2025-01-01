"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const ProjectMember = sequelize.define("ProjectMember", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    });

    ProjectMember.associate = (models) => {
        ProjectMember.belongsTo(models.User, {
            foreignKey: "userID",
            as: "user",
        });

        ProjectMember.belongsTo(models.Project, {
            foreignKey: "projectID",
            as: "project",
        });
    };

    return ProjectMember
}