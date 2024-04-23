import orderService from '../services/Order/OrderService.js';

const createOrderFromCartController = async (req, res) => {
    const { id_user, address, phone_number } = req.body;

    try {
        const order = await orderService.createOrderFromCartService(
            id_user,
            address,
            phone_number,
        );
    
        return res.status(201).json({
            message: 'Đơn hàng được tạo thành công.',
            orderId: order.id_order,
        });
    } catch (err) {
        console.error('Error creating order:', err); // Ghi log chi tiết về lỗi
        return res.status(500).json({ message: 'Không thể tạo đơn hàng.' });
    }
};

export default {
    createOrderFromCartController,
};