To document your MySQL database schema in a README file, you can provide a clear explanation of each table, its columns, and relationships. Here's an example README for your database schema:

---

# Phone Data MySQL Database Schema

This repository contains the MySQL database schema for managing phone data, including users, products, carts, and orders.

## Tables

### `users`

-   `id_user` (INT): Primary key auto-incremented.
-   `username` (NVARCHAR(255)): User's username.
-   `email` (NVARCHAR(255)): User's email address.
-   `password` (NVARCHAR(255)): User's password.
-   `isAdmin` (ENUM): User's role, either 'ADMIN' or 'USER'. Default is 'USER'.

### `tokens`

-   `id_token` (INT): Primary key auto-incremented.
-   `id_user` (INT): Foreign key referencing `users(id_user)`.
-   `token` (NVARCHAR(255)): User token for authentication.

### `products`

-   `id_product` (INT): Primary key auto-incremented.
-   `nameProduct` (NVARCHAR(255)): Product name.
-   `price` (DECIMAL(20, 2)): Product price.
-   `stock_quantity` (INT): Quantity of product in stock.
-   `descrip_product` (LONGTEXT): Product description.
-   `url_picture` (LONGBLOB): URL of the product picture.
-   `brand` (NVARCHAR(255)): Product brand.

### `carts`

-   `id_cart` (INT): Primary key auto-incremented.
-   `id_user` (INT): Foreign key referencing `users(id_user)`.

### `cart_items`

-   `id_cart_item` (INT): Primary key auto-incremented.
-   `id_cart` (INT): Foreign key referencing `carts(id_cart)`.
-   `id_product` (INT): Foreign key referencing `products(id_product)`.
-   `quantity` (INT): Quantity of product in the cart.
-   `nameProduct` (NVARCHAR(255)): Name of the product in the cart.
-   `price` (DECIMAL(20, 2)): Price of the product in the cart.
-   `url_picture` (LONGBLOB): URL of the product picture in the cart.

### `order_items`

-   `id_order_items` (INT): Primary key auto-incremented.
-   `address` (NVARCHAR(255)): Shipping address.
-   `phone_number` (BIGINT): Phone number for contact.
-   `note` (LONGTEXT): Additional notes for the order.
-   `total_amount` (DECIMAL(20, 2)): Total amount of the order.
-   `createdAt` (DATETIME): Time of order creation.
-   `updatedAt` (DATETIME): Time of last update to the order.
-   `username` (NVARCHAR(255)): Username associated with the order.

### `orders`

-   `id_order` (INT): Primary key auto-incremented.
-   `id_product` (INT): Foreign key referencing `products(id_product)`.
-   `id_user` (INT): Foreign key referencing `users(id_user)`.
-   `quantity` (INT): Quantity of the product in the order.
-   `price` (DECIMAL(20, 2)): Price of the product in the order.

---
