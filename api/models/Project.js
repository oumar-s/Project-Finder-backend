"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        projectTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectDescription: {
            type: DataTypes.STRING,
        },
        projectRepository: {
            type: DataTypes.STRING,
        },
        projectStatus: { //New, Ongoing, Completed. 
            type: DataTypes.STRING,
            default: "New",
        },
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User, {
            foreignKey: "ownerID",
            as: "owner",
        });

        Project.belongsTo(models.Team, {
            foreignKey: "teamID",
            as: "team",
        });

        //Projects should have a hasMany relationship with ProjectMembers
        Project.hasMany(models.ProjectMember, {
            foreignKey: "projectID",
            as: "projectMembers",
        });
    };

    return Project
}
