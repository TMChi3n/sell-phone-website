import { DataTypes } from 'sequelize';
import db from '../db.js';

const Product = db.define(
    'Product',
    {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nameProduct: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Thêm trường pictureUrl để lưu đường dẫn đến hình ảnh sản phẩm
    },
    {
        timestamps: false,
        tableName: 'products',
    },
);

export default Product;
