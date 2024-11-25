"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('bv9y077tcfuyxtgurjal', 'umgc60thjbqfq9vd', 'kspfMjojfMfLNC85Vu08', {
    host: 'bv9y077tcfuyxtgurjal-mysql.services.clever-cloud.com',
    dialect: 'mysql',
});
exports.default = sequelize;
