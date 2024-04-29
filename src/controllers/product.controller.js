import ProductService from '../services/product.service.js';
import { handleServiceError } from '../utils/serviceError.util.js';

export default class ProductController {
    static async createProduct(req, res) {
        try {
            const product = await ProductService.create(req.body, req.file, req.restaurant.id);
            res.status(201).json(product);
        } catch (error) {
            console.log(error);
            return handleServiceError(error, res);
        }
    }

    static async deleteProduct(req, res) {
        try {
            await ProductService.delete(req.body.id, req.restaurant.id);
            res.status(204).send();
        } catch (error) {
            return handleServiceError(error, res);
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await ProductService.update(req.body, req.file, req.restaurant.id);
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return handleServiceError(error, res);
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await ProductService.get(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return handleServiceError(error, res);
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAll(req.params.restaurantId);
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            return handleServiceError(error, res);
        }
    }
    
}
