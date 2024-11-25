import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";
import { Product } from "./product";

export const Review = sequelize.define('review', {
    review_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model:User,
            key:'user_id'
        },
        allowNull: false
    },
    product_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Product,
            key:'product_id'
        },
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review_text:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

Review.belongsTo(User,{ foreignKey: 'user_id'});
User.hasMany(Review,{ foreignKey: 'user_id'});

Review.belongsTo(Product,{ foreignKey: 'product_id'});
Product.hasMany(Review,{ foreignKey: 'product_id'});