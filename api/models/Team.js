"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define("Team", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamIcon: {
            type: DataTypes.STRING
        },
        teamBanner: {
            type: DataTypes.STRING
        },
        teamStatus: { //Open, Full, Closed
            type: DataTypes.STRING,
            default: "Open",
        },
    });

    Team.associate = (models) => {
        Team.belongsTo(models.User, {
            foreignKey: "ownerID",
            as: "owner",
        });
    };

    return Team
}
