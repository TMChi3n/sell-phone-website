import Cart from '../../model/Cart.js';
import CartItem from '../../model/CartItem.js';

class CartService {
    static async addToCart(id_user, id_product, quantity) {
        let cart = await Cart.findOne({ where: { id_user } });

        if (!cart) {
            cart = await Cart.create({ id_user });
        }

        const existingCartItem = await CartItem.findOne({
            where: { id_cart: cart.id_cart, id_product },
        });

        if (existingCartItem) {
            await existingCartItem.update({ quantity: existingCartItem.quantity + quantity });
        } else {
            await CartItem.create({ id_cart: cart.id_cart, id_product, quantity });
        }
    }

    static async getCartItems(id_user) {
        const cart = await Cart.findOne({ where: { id_user } });

        if (!cart) {
            return { status: 'ERR', message: 'Cart not found' };
        }

        const cartItems = await CartItem.findAll({
            where: { id_cart: cart.id_cart },
        });

        return { status: 'OK', data: cartItems };
    }
}

export default CartService;