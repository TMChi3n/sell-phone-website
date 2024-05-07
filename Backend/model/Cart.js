import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./userModel.js";
const Cart = db.define(
  "Cart",
  {
    id_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
  },
  {
    timestamps: false,
    tableName: "carts",
  }
);

export default Cart;
