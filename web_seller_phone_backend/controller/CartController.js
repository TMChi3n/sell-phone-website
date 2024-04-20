import { addItem } from '../services/Cart/AddToCartService.js';
import { updateItem } from '../services/Cart/UpdateCartItemService.js';

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Gọi hàm addItem từ service để thêm sản phẩm vào giỏ hàng
        const cartItem = await addItem(userId, productId, quantity);

        return res.status(201).json({ message: 'Item added to cart successfully', cartItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    // Code xử lý việc xóa sản phẩm khỏi giỏ hàng
};

const updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const cartItem = await updateItem(userId, productId, quantity); // Gọi hàm updateItem từ service để cập nhật số lượng sản phẩm trong giỏ hàng

        return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { addToCart, removeCartItem, updateCartItem }; 
