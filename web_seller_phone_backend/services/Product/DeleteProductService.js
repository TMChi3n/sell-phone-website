// ProductService.js
import Product from '../../model/ProductModel.js';

const deleteProduct = async (id) => {
    try {
      const checkProduct = await Product.findByPk(id);
      if (!checkProduct) {
        return {
          status: 'error',
          message: 'Product not found',
        };
      }
      await Product.destroy({
        where: {
          id_product: id,
        },
      });
      return {
        status: 'success',
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  };
  
export { deleteProduct };
