import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Product } from "./product";

export const Review = sequelize.define('Review', {
    review_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    product_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Product,
            key:'product_id'
        },
        allowNull: false
    },
    user_name:{
        type: DataTypes.STRING,
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

Review.belongsTo(Product,{ foreignKey: 'product_id'});
Product.hasMany(Review,{ foreignKey: 'product_id'});