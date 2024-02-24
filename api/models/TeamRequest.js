"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const TeamRequest = sequelize.define("TeamRequest", {
        // requesterId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // projectId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // ownerId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        status: { //Pending, Accepted, Rejected
            type: DataTypes.STRING,
            default: 'Pending'
        },
    });

    TeamRequest.associate = function (models) {
        // associations can be defined here
        TeamRequest.belongsTo(models.User, {
            foreignKey: "requesterId",
            as: "requester",
        });
        // Request.belongsTo(models.User, {
        //     foreignKey: "requesterId",
        //     as: "member",
        // });
        // Request.belongsTo(models.User, {
        //     foreignKey: "ownerId",
        //     as: "owner",
        // });
        TeamRequest.belongsTo(models.Team, {
            foreignKey: "teamId",
            as: "team",
        });
    };

    return TeamRequest
}