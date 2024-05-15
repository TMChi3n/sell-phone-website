import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ProductTable = ({ products, handleEditProduct, handleConfirmDelete }) => {
    const user = useSelector((state) => state.user);
    console.log(products);
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
            render: (url_picture) => {
                const imageUrl = url_picture?.data
                    ? String.fromCharCode(...url_picture.data)
                    : 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png';
                return (
                    <img src={imageUrl} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                );
            },
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                console.log(record);
                const imageUrl = record.url_picture?.data
                    ? String.fromCharCode(...record.url_picture.data)
                    : 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png';
                const product = {
                    ...record,
                    url_picture: imageUrl,
                };
                return (
                    <Space>
                        <Button icon={<EditOutlined />} onClick={() => handleEditProduct(product)} />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleConfirmDelete(record.id_product, user.access_token)}
                        />
                    </Space>
                );
            },
        },
    ];

    return <Table dataSource={products} columns={productColumns} rowKey={(record) => record.id_product} />;
};

export default ProductTable;
