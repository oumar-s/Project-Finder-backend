"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const TeamRequest = sequelize.define("TeamRequest", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        status: { //Pending, Accepted, Rejected
            type: DataTypes.STRING,
            default: 'Pending'
        },
    });

    TeamRequest.associate = function (models) {
        TeamRequest.belongsTo(models.User, {
            foreignKey: "userID",
            as: "user",
        });
       
        TeamRequest.belongsTo(models.Team, {
            foreignKey: "teamID",
            as: "team",
        });
    };

    return TeamRequest
}