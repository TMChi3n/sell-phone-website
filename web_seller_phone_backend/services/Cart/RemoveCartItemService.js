import Cart from '../../model/CartModel.js';

const removeItem = async (userId, productId) => {
    try {
        // Tìm kiếm và xóa sản phẩm khỏi giỏ hàng của người dùng dựa trên userId và productId
        const cartItem = await Cart.findOne({ where: { id_user: userId, id_product: productId } });

        if (cartItem) {
            await cartItem.destroy(); // Xóa sản phẩm khỏi giỏ hàng
        } else {
            throw new Error('Cart item not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export { removeItem };
