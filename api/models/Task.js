"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taskDescription: {
            type: DataTypes.STRING,
        },
        taskStatus: { //New, In-process, Completed. 
            type: DataTypes.STRING,
            default: "New",
        },
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: "ownerID",
            as: "owner",
        });

        Task.belongsTo(models.User, {
            foreignKey: "assignedTo",
            as: "assignee",
        });

        Task.belongsTo(models.Project, {
            foreignKey: "projectID",
            as: "project",
        });
    };

    return Task
}