"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const product_1 = require("./product");
exports.Review = connection_1.default.define('Review', {
    review_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: product_1.Product,
            key: 'product_id'
        },
        allowNull: false
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    review_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.Review.belongsTo(product_1.Product, { foreignKey: 'product_id' });
product_1.Product.hasMany(exports.Review, { foreignKey: 'product_id' });
