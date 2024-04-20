import { DataTypes } from 'sequelize';
import db from '../db.js';

const Cart = db.define(
    'Cart',
    {
        id_cart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'carts',
    }
);

export default Cart;
