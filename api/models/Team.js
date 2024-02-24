"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define("Team", {
        teamName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamIcon: {
            type: DataTypes.BLOB
        },
        teamBanner: {
            type: DataTypes.BLOB
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
