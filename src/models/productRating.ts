import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Product } from "./product";

export const ProductRating = sequelize.define('productRating', {
    rating_id:{
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
    average_rating:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    rating_count:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

ProductRating.belongsTo(Product,{ foreignKey: 'product_id'});
Product.hasMany(ProductRating,{ foreignKey: 'product_id'});