import express from 'express';
import ProductController from '../controllers/product.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import validateUpload from '../middlewares/validateUpload.middleware.js';

const productRouter = express.Router();

productRouter.post('/product', authenticate, validateUpload('image'), ProductController.createProduct);
productRouter.delete('/product', authenticate, ProductController.deleteProduct);
productRouter.put('/product', authenticate, validateUpload('image'), ProductController.updateProduct);
productRouter.get('/product/:id', ProductController.getProduct);
productRouter.get('/products/:restaurantId', ProductController.getAllProducts);

export default productRouter;
