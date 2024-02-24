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
            foreignKey: "projectMemberID",
            as: "projectMembers",
        });
    };

    return Project
}
