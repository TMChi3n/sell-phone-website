import CartService from '../services/Cart/CartService.js';

const addToCart = async (req, res) => {
    try {
        const { id_user, id_product, quantity } = req.body;
        if (!id_user || !id_product || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        await CartService.addToCart(id_user, id_product, quantity); // Thêm sản phẩm vào giỏ hàng
        res.status(200).json({ message: 'Product added to cart' }); // Phản hồi thành công
    } catch (error) {
        res.status(500).json({ message: error.message }); // Xử lý lỗi
    }
};

const getCartItems = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        const response = await CartService.getCartItems(id_user);

        if (response.status === 'ERR') {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(response); // Thành công

    } catch (error) {
        res.status(500).json({ message: error.message }); // Xử lý lỗi
    }
};

export { addToCart, getCartItems };