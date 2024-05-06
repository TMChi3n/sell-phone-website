import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './UserModel.js';

const Order = db.define(
    'Order',
    {
        id_order: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_order_items: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: 'id_order',
            },
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
        timestamps: true,
        tableName: 'orders',
    },
);

export default Order;
