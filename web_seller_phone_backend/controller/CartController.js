import { addItem } from '../services/Cart/AddToCartService.js';

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

const removeItem = async (req, res) => {
    // Code xử lý việc xóa sản phẩm khỏi giỏ hàng
};

const updateItem = async (req, res) => {
    // Code xử lý việc cập nhật thông tin sản phẩm trong giỏ hàng
};

export { addToCart, removeItem, updateItem };
