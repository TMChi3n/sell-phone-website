import Cart from '../../model/CartModel.js';

const updateItem = async (userId, productId, quantity) => {
    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng chưa
        let cartItem = await Cart.findOne({ where: { id_user: userId, id_product: productId } });

        if (cartItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            cartItem.quantity = quantity; // Cập nhật số lượng mới
            await cartItem.save();
        } else {
            throw new Error('Cart item not found');
        }

        return cartItem; // Trả về thông tin sản phẩm đã được cập nhật trong giỏ hàng
    } catch (error) {
        throw new Error(error.message);
    }
};

export { updateItem };
