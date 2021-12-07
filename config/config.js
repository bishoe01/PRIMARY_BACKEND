require("dotenv").config();

module.exports = {
  development: {
    username: "primarykey",
    password: process.env.DATABASE_PASSWORD,
    database: "PrimaryKey",
    host: "primarykey.cqok5mvhto8h.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql",
    "operatiorAliases":false
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
