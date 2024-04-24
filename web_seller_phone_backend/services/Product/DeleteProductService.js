// ProductService.js
import Product from '../../model/ProductModel.js';

const deleteProduct = async (id) => {
    try {
        const checkProduct = await Product.findByPk(id);
        if (!checkProduct) {
            return {
                status: 'error',
                message: 'The product is not defined',
            };
        }

        await Product.destroy(data, {
            where: {
                id_product: id,
            },
        });

        return {
            status: 'success',
            message: 'Product updated successfully',
        };
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  };
  
export { deleteProduct };
