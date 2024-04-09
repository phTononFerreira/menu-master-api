import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';

const categoryRouter = express.Router();

categoryRouter.post('/category', authenticate, CategoryController.createCategory);
categoryRouter.delete('/category', authenticate, CategoryController.deleteCategory);
categoryRouter.put('/category', authenticate, CategoryController.updateCategory);
categoryRouter.get('/categor/:id', CategoryController.getCategory);
categoryRouter.get('/categories', authenticate, CategoryController.getAllCategories);

export default categoryRouter;
