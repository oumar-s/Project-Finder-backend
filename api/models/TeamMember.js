"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const TeamMember = sequelize.define("TeamMember", {

    });

    TeamMember.associate = (models) => {
        TeamMember.belongsTo(models.User, {
            foreignKey: "userID",
            as: "user",
        });

        TeamMember.belongsTo(models.Team, {
            foreignKey: "teamID",
            as: "team",
        });
    };

    return TeamMember
}