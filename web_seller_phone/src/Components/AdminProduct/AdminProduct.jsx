import React, { useState } from 'react';
import { Button, Form, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, queryClient } from 'react-query';
import productService from '../../apiService/ProductService';
import ProductTable from './ConComponent/ProductTable';
import AddProductModal from './ConComponent/AddProductModal';
import EditProductDrawer from './ConComponent/EditProductDrawer';
import ConfirmDeleteModal from './ConComponent/ConfirmDeleteModal';
import { updateProductRequest } from '../../apiService/apiService';
import { success } from '../../Components/Message/Message';

const AdminProduct = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: products, isLoading: isLoadingProducts } = useQuery('products', productService.getAll);

    const createMutation = useMutation(productService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            setIsDrawerOpen(false);
        },
    });

    const updateProduct = async (productId, data) => {
        try {
            const response = await updateProductRequest(productId, data);
            success('Sửa thành công');
            alert('thành công');
            setIsDrawerOpen(false);

            console.log(response);
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    // const updateMutation = useMutation((id, productData) => productService.update(id, productData), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('products');
    //         notification.success({ message: 'Product updated successfully' });
    //     },
    //     onError: (error) => {
    //         notification.error({
    //             message: 'Error updating product',
    //             description: error.message,
    //         });
    //     },
    // });

    const deleteMutation = useMutation(productService.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            setIsModalDeleteOpen(false);
        },
    });

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

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteMutation.mutateAsync(productId);
            notification.success({
                message: 'Delete Successful',
                description: 'The product has been deleted successfully.',
            });
            queryClient.invalidateQueries('products');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedProduct || !selectedProduct.id_product) {
            console.error('Selected product or product ID is undefined');
            return;
        }
        try {
            await deleteMutation.mutateAsync(selectedProduct.id_product);
            setIsModalDeleteOpen(false); // Close the confirmation modal after successful deletion
            success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div>
            <h1>Product Management</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct} style={{ marginBottom: 16 }}>
                Add Product
            </Button>

            {isLoadingProducts ? (
                <div>Loading...</div>
            ) : (
                <ProductTable
                    products={products?.data || []}
                    handleEditProduct={handleEditProduct}
                    handleDeleteProduct={handleDeleteProduct}
                />
            )}

            <AddProductModal
                form={form}
                isModalOpen={isModalOpen}
                createMutation={createMutation}
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
