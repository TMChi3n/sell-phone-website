// AddToCartService.js

import Cart from '../../model/CartModel.js';

const addItem = async (userId, productId, quantity) => {
    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng chưa
        let cartItem = await Cart.findOne({ where: { id_user: userId, id_product: productId } });

        if (cartItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Nếu chưa có, tạo mới một mục trong giỏ hàng
            cartItem = await Cart.create({
                id_user: userId,
                id_product: productId,
                quantity: quantity
            });
        }

        return cartItem; // Trả về thông tin sản phẩm đã thêm vào giỏ hàng
    } catch (error) {
        throw new Error(error.message);
    }
};

export { addItem };
