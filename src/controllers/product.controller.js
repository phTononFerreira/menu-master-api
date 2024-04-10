
import ProductService from '../services/product.service.js';
import APIMessages from '../utils/messages.util.js';
import ServiceError from './../utils/serviceError.util.js';


export default class ProductController {
    static async createProduct(req, res) {
        try {
            const product = await ProductService.create(req.body, req.file, req.restaurant.id);
            res.status(201).json(product);
        } catch (error) {
            console.log(error)
            if (error instanceof ServiceError) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    static async deleteProduct(req, res) {
        try {
            await ProductService.delete(req.body.id, req.restaurant.id);
            res.status(204).send();
        } catch (error) {
            console.log("error\n\n\n:", error)
            if (error instanceof ServiceError) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await ProductService.update(req.body, req.file, req.restaurant.id);
            res.status(200).json(product);
        } catch (error) {
            console.log(error)
            if (error instanceof ServiceError) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await ProductService.get(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            console.log(error)
            if (error instanceof ServiceError) {
                return res.status(404).json({ error: error.message });
            } else {
                return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
            }
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAll(req.params.id);
            res.status(200).json(products);
        } catch (error) {
            if (error instanceof ServiceError) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
            }
        }
    }
}
