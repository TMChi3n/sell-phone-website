import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Order from './order.js';
import Product from './ProductModel.js';

const OrderItem = db.define(
    'OrderItem',
    {
        id_order_items: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'order_items',
    },
);

export default OrderItem;
