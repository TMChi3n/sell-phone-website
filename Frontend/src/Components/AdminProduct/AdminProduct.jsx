import { useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductTable from './ConComponent/ProductTable';
import AddProductModal from './ConComponent/AddProductModal';
import EditProductDrawer from './ConComponent/EditProductDrawer';
import ConfirmDeleteModal from './ConComponent/ConfirmDeleteModal';
import {
    updateProductRequest,
    getAllProductRequest,
    createProductRequest,
    deleteProductRequest,
} from '../../apiService/apiService';
import Loading from '../Loading/Loading';

const AdminProduct = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchApi = async () => {
        setIsLoadingProducts(true);
        const result = await getAllProductRequest();
        setIsLoadingProducts(false);

        setProducts(result.data);
    };

    console.log(products);
    const createProduct = async (data, access_token) => {
        try {
            const response = await createProductRequest(data, access_token);
            fetchApi();
            setIsModalOpen(false);

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    const updateProduct = async (productId, data) => {
        try {
            const response = await updateProductRequest(productId, data);
            fetchApi();
            setIsDrawerOpen(false);

            console.log(response);
        } catch (e) {
            console.error('Error:', e);
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);

    const handleAddProduct = () => {
        if (form) {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        form.setFieldsValue(product);
        setSelectedProduct(product);
        setIsDrawerOpen(true);
    };

    const handleConfirmDelete = async (id, access_token) => {
        try {
            const result = await deleteProductRequest(id, access_token);
            if (result) {
                fetchApi();
                setIsModalDeleteOpen(false);
            }
        } catch (error) {
            console.log('Lỗi', error);
        }
    };

    return (
        <div>
            <h3 style={{ marginTop: '20px' }}>Quản lí sản phẩm</h3>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct} style={{ margin: '35px 0px' }}>
                Thêm sản phẩm
            </Button>

            <Loading isLoading={isLoadingProducts}>
                <ProductTable
                    products={products || []}
                    handleEditProduct={handleEditProduct}
                    handleConfirmDelete={handleConfirmDelete}
                />
            </Loading>

            <AddProductModal
                form={form}
                isModalOpen={isModalOpen}
                createProduct={createProduct}
                onCancel={() => setIsModalOpen(false)}
            />

            <EditProductDrawer
                form={form}
                isDrawerOpen={isDrawerOpen}
                updateProduct={updateProduct}
                onClose={() => setIsDrawerOpen(false)}
            />

            <ConfirmDeleteModal
                isModalDeleteOpen={isModalDeleteOpen}
                handleConfirmDelete={handleConfirmDelete}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </div>
    );
};

export default AdminProduct;
