import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const User = sequelize.define('user',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
    }
})