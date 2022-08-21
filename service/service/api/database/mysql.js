const Sequelize = require("sequelize");

module.exports = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_URL,
    dialect: "mysql",
    port: 3306
});