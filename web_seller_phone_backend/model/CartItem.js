import { DataTypes } from 'sequelize';
import db from '../db.js';

const CartItem = db.define('CartItem', {
    id_cart_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_cart: {
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
}, {
    timestamps: false,
    tableName: 'cart_items',
});

export default CartItem;
