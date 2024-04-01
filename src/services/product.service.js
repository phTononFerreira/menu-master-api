import pkg from 'validator';
import Category from '../models/category.model.js';
import { uploadImage } from '../utils/cloudinary.util.js';
import ServiceError from '../utils/serviceError.util.js';
import Product from './../models/product.model.js';

const { isUUID } = pkg;

class ProductService {
    static async create(data, file, restaurantId) {
        if (!data.name || !data.price || !data.categoryID || !data.description || !file || !restaurantId) {
            throw new ServiceError('Missing required fields');
        }

        if (!isUUID(data.categoryID)) {
            throw new ServiceError('Invalid category ID');
        }

        const category = await Category.findByPk(data.categoryID);
        if (!category) {
            throw new ServiceError('Category not found');
        }

        data.restaurantID = restaurantId;


        const imageUrl = await uploadImage(file);
        data.image = imageUrl;

        const product = await Product.create(data);
        return product;
    }

    static async delete(id, restaurantId) {
        console.log(id, restaurantId)
        if(!restaurantId){
            throw new ServiceError('Missing \'id\' field');
        }

        const product = await Product.findOne({ where: { id, restaurantID: restaurantId } });
        if (!product) {
            throw new ServiceError('Product not found');
        }
        await product.destroy();
    }

    static async update(data, file, restaurantId) {
        if (!data.id || !data.name || !data.price || !data.categoryID || !data.description || !file || !restaurantId) {
            throw new ServiceError('Missing required fields');
        }
        
        const actualProduct = await Product.findByPk(data.id);
        if (!actualProduct) {
            throw new ServiceError('Product not found');
        }
    
        if (!isUUID(data.categoryID)) {
            throw new ServiceError('Invalid category ID');
        }
    
        const category = await Category.findByPk(data.categoryID);
        if (!category) {
            throw new ServiceError('Category not found');
        }
    
        data.restaurantID = restaurantId;
    
        const imageUrl = await uploadImage(file);
        data.image = imageUrl;
    
        const product = await Product.update(data, { where: { id: data.id } });
        return product;
    }
    

    static async get(id) {
        if(!id){
            throw new ServiceError('Missing \'id\' field');
        }

        const product = await Product.findOne({ where: { id } });
        if (!product) {
            throw new ServiceError('Product not found');
        }
        return product;

    }

    static async getAll(restaurantId) {
        const products = await Product.findAll({ where: { restaurantID: restaurantId } });
        return products;
    }
}

export default ProductService;
