import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Product = sequelize.define('product',{
    product_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})