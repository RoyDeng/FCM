const sequelize = require("../database/mysql.js");
const Sequelize = require("sequelize");
const Job = require("./job.js")(sequelize, Sequelize.DataTypes);

sequelize.sync().then(() => {
    console.log("資料庫同步成功");
}).catch(err => {
    console.error("資料庫同步失敗", err);
});

module.exports = {
    Job
};