import { Modal, Form, Button, Input } from 'antd';
import InputComponent from '../../InputComponent/InputComponent';
import { useSelector } from 'react-redux';

const AddProductModal = ({ form, isModalOpen, createProduct, onCancel }) => {
    const user = useSelector((state) => state.user);

    return (
        <Modal title="Add Product" visible={isModalOpen} onCancel={onCancel} footer={null}>
            <Form
                form={form}
                onFinish={(values) => {
                    console.log(values);
                    createProduct(values, user.access_token);
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Product Name"
                    name="nameProduct"
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                >
                    <InputComponent allowClear placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter the product price' }]}
                >
                    <InputComponent allowClear placeholder="Enter product price" />
                </Form.Item>

                <Form.Item
                    label="Stock"
                    name="stock_quantity"
                    rules={[{ required: true, message: 'Please enter the stock quantity' }]}
                >
                    <InputComponent allowClear placeholder="Enter stock quantity" />
                </Form.Item>

                <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Please enter the product brand' }]}
                >
                    <InputComponent allowClear placeholder="Enter product brand" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="descrip_product"
                    rules={[{ required: true, message: 'Please enter the product description' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter product description" allowClear />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="url_picture"
                    rules={[{ required: true, message: 'Please provide an image URL' }]}
                >
                    <InputComponent allowClear placeholder="Enter image URL" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
