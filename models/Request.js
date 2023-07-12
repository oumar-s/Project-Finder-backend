"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        requesterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            default: 'Pending'
        },
    });

    Request.associate = function (models) {
		// associations can be defined here
		Request.belongsTo(models.User, {
			foreignKey: "requesterId",
			as: "requester",
		});
        Request.belongsTo(models.User, {
			foreignKey: "ownerId",
			as: "owner",
		});
		Request.belongsTo(models.Project, {
			foreignKey: "projectId",
			as: "project",
		});
	};

    return Request
}