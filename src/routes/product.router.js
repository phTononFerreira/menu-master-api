import express from 'express';
import upload from '../config/multer.config.js';
import ProductController from '../controllers/product.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';

const productRouter = express.Router();

productRouter.post('/product', authenticate, upload.single('image'), ProductController.createProduct);
productRouter.delete('/product', authenticate, ProductController.deleteProduct);
productRouter.put('/product', authenticate, upload.single('image'), ProductController.updateProduct);
productRouter.get('/product', ProductController.getProduct);
productRouter.get('/products', ProductController.getAllProducts);

export default productRouter;
