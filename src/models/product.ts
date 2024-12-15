import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Product = sequelize.define('Product',{
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
        allowNull: false
    },
    price:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})