import { Sequelize } from "sequelize";

const db = {
  NAME: "Crafty",
  USERNAME: "Crafty",
  PASSWORD: "Crafty",
  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "mysql.Crafty",
    port: 3306,
    logging: function (str) {
      console.log(str);
    },
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options
);
