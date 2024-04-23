import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../Components/CartComponent/CartItem';
import InputForm from '../../Components/InputForm/InputForm';
import { CloseOutlined } from '@ant-design/icons';
import Button from '../../Components/Button';
import { getCartItemRequest, increaseItemRequest, decreaseItemRequest } from '../../apiService/apiService';

const CartPage = () => {
    const user = useSelector((state) => state.user);
    const [cartItems, setCartItems] = useState([]);
    const [isShowCheckout, setIsShowCheckout] = useState(false);

    // Fetch cart items when the user changes or initially loads the page
    useEffect(() => {
        if (user && user.id && user.access_token) {
            const fetchCartItems = async () => {
                try {
                    const cart = await getCartItemRequest(user.id, user.access_token);
                    setCartItems(cart.data);
                } catch (error) {
                    console.error('Failed to fetch cart items:', error);
                }
            };

            fetchCartItems();
        }
    }, [user]);

    // Calculate the total price of the cart
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    };

    // Handlers for cart item quantity adjustments
    const handleIncrease = async (productId) => {
        if (!user || !user.id || !user.access_token) {
            console.error('User authentication details are missing');
            alert('Please log in to adjust the cart items.');
            return;
        }

        console.log('Access Token:', user.access_token);
        console.log('Product ID:', productId);
        console.log('User ID:', user.id);

        try {
            const response = await increaseItemRequest(user.id, productId, user.access_token);
            if (response.success) {
                updateCartItemQuantity(productId, 1);
            } else {
                console.error('Failed to increase quantity:', response.message);
                alert('Failed to increase quantity.');
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecrease = async (productId) => {
        const product = cartItems.find((item) => item.id === productId);
        if (product && product.quantity > 1) {
            try {
                await decreaseItemRequest(user.id, productId, user.access_token);
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    const updateCartItemQuantity = (productId, change) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + change } : item)),
        );
    };

    // Handler for checkout process
    const handleCheckout = () => {
        setIsShowCheckout(true);
    };

    return (
        <div style={{ backgroundColor: '#f5f5fa', display: 'flex', flexDirection: 'column', minHeight: '2000px' }}>
            <div style={{ margin: '40px', fontWeight: 'bold', fontSize: '15px' }}>Giỏ hàng</div>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng của bạn trống</p>
            ) : (
                cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        product={item}
                        onIncrease={() => handleIncrease(item.id_product)}
                        onDecrease={() => handleDecrease(item.id_product)}
                    />
                ))
            )}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <div>Tổng tiền: {calculateTotalPrice()}</div>
                <div>Phí vận chuyển: Miễn phí</div>
                <button
                    onClick={handleCheckout}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '10px',
                        cursor: 'pointer',
                        fontSize: '15px',
                    }}
                >
                    Thanh toán
                </button>
            </div>

            {isShowCheckout && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: 20,
                            borderRadius: 5,
                            textAlign: 'center',
                            position: 'relative',
                        }}
                    >
                        <CloseOutlined
                            onClick={() => setIsShowCheckout(false)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '7px',
                                padding: '5px',
                                cursor: 'pointer',
                            }}
                        />
                        <h3>Thông tin đặt hàng</h3>
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Họ và tên" />
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Số điện thoại" />
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Email" />
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Địa chỉ" />
                        <Button rounded>Xác nhận và đặt hàng</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
