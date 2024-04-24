import React from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductTable = ({ products, handleEditProduct, handleDeleteProduct }) => {
  const productColumns = [
    { title: 'Product ID', dataIndex: 'id_product', key: 'id_product' },
    { title: 'Name', dataIndex: 'nameProduct', key: 'nameProduct' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Stock', dataIndex: 'stock_quantity', key: 'stock_quantity' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    // { title: 'Description', dataIndex: 'descrip_product', key: 'descrip_product' },
    {
      title: 'Image',
      dataIndex: 'url_picture', // Hiển thị ảnh sản phẩm
      key: 'url_picture',
      render: (Blog) => (
        <img src={Blog} style={{ width: '50px', height: '50px' }} />
      ),
    },
    
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEditProduct(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(record.id_product)} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={productColumns}
      rowKey={(record) => record.id_product}
    />
  );
};

export default ProductTable;
