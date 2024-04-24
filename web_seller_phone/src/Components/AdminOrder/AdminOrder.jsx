import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../apiService/apiService'; 
import { Table } from 'antd'; 

const AdminOrder = () => {
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(); 
        setOrders(data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); 
  }, []);

  const columns = [
    { title: 'Order ID', dataIndex: 'id_order', key: '1' },
    { title: 'User ID', dataIndex: 'id_user', key: '2' },
    { title: 'Username', dataIndex: 'username', key: '3' },
    { title: 'Address', dataIndex: 'address', key: '4' },
    { title: 'Phone Number', dataIndex: 'phone_number', key: '5' },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: '6',
      render: (amount) => `\$${parseFloat(amount).toFixed(2)}`, // Định dạng dưới dạng tiền tệ
    },
  ];

  const dataSource = orders.map((order, index) => ({
    key: index,
    id_order: order.id_order,
    id_user: order.id_user,
    username: order.username,
    address: order.address,
    phone_number: order.phone_number,
    total_amount: order.total_amount,
  }));

  return (
    <div>
      <h4>Danh sách đơn hàng</h4>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default AdminOrder;
