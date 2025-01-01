// This file should not be modified
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const HttpsProxyAgent = require('https-proxy-agent');
const e = require("express");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require('../db_config/config.js')[env];
const db = {};

// disable sequelize logging
config.logging = false;
let sequelize;
const fixieUrl = process.env.FIXIE_URL;
if (config.url) {
  console.log("Using database URL");
  // If Fixie URL is provided, add proxy settings
  if (fixieUrl) {
    const agent = new HttpsProxyAgent(fixieUrl);
    config.dialectOptions = {
      ...config.dialectOptions,
      // encrypt: true,
      // trustServerCertificate: false,
      // Use the Fixie proxy for database connections
      httpAgent: agent,
      httpsAgent: agent,
    };
  }

  sequelize = new Sequelize(config.url, config);
} else {

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;