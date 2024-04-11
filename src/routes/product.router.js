import express from 'express';
import ProductController from '../controllers/product.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import uploadValidation from '../middlewares/uploadValidation.middleware.js';

const productRouter = express.Router();

productRouter.post('/product', authenticate, uploadValidation('image'), ProductController.createProduct);
productRouter.delete('/product', authenticate, ProductController.deleteProduct);
productRouter.put('/product', authenticate, uploadValidation('image'), ProductController.updateProduct);
productRouter.get('/product/:id', ProductController.getProduct);
productRouter.get('/products/:restaurantId', ProductController.getAllProducts);

export default productRouter;
