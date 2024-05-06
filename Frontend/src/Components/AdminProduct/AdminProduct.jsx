import  { useState , useEffect} from 'react';
import { Button, Form, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductTable from './ConComponent/ProductTable';
import AddProductModal from './ConComponent/AddProductModal';
import EditProductDrawer from './ConComponent/EditProductDrawer';
import ConfirmDeleteModal from './ConComponent/ConfirmDeleteModal';
import { updateProductRequest, getAllProductRequest,createProductRequest, deleteProductRequest } from '../../apiService/apiService'
import { success, error } from '../../Components/Message/Message';


const AdminProduct = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false)
    const [products, setProducts] = useState([])

    const fetchApi = async () =>{
        const result = await getAllProductRequest();
        setProducts(result.data)

    }
    // const { data: products, isLoading: isLoadingProducts } = useQuery('products', productService.getAll);

   

    console.log(products)
    const createProduct = async (data, access_token) => {
        try {
            const response = await createProductRequest(data,access_token);
            fetchApi()
            success('Tạo thành công');
            setIsModalOpen(false);

            console.log(response);
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

   
    const updateProduct = async (productId, data) => {
        try {
            const response = await updateProductRequest(productId, data);
            fetchApi()
            success('Sửa thành công');
            setIsDrawerOpen(false);

            console.log(response);
        } catch (e) {
            console.error('Error:', error);
            

        }
    };
    useEffect(()=>{
       
        fetchApi()

    },[])


    // const deleteMutation = useMutation(productService.delete, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('products');
    //         setIsModalDeleteOpen(false);
    //         success('Thành công rồi nhé');
    //     },
    //     onError: (error) => {
    //         console.error('Thành công rồi nhé', error);
    //         notification.error({
    //             message: 'Thành công rồi nhé',
    //             description: error.response?.data?.message || 'ahihi',
    //         });
    //     },
    // });
    

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

    // const handleDeleteProduct = async (productId) => {
    //     try {
    //         await deleteMutation.mutateAsync(productId);
    //         queryClient.invalidateQueries('products');
    //         notification.success({
    //             message: 'thành công',
    //             description: 'thành công',
    //         });
    //     } catch (error) {
    //         console.error('thành công');
    //         notification.error({
    //             message: 'thành công',
    //             description: error.response?.data?.message || 'ahihi',
    //         });
    //     }
    // };
    // const handleDeleteProduct = (id) =>{
    //     setIsModalDeleteOpen(true)
    //     console.log(id)
    // }
    
    
    

    const handleConfirmDelete = async (id, access_token) => {
        try {
            const result = await deleteProductRequest(id,access_token)
            if (result) {
                fetchApi()
                setIsModalDeleteOpen(false)
                success('Xoá thành công');



            }
        } catch (error) {
            console.log("Lỗi",error)

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
                    products={products || []}
                    handleEditProduct={handleEditProduct}
                    handleConfirmDelete={handleConfirmDelete}
                />
            )}

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
