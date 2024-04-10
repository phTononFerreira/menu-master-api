import pkg from 'validator';
import Category from '../models/category.model.js';
import Rating from '../models/rating.model.js';
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
        if (!restaurantId) {
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
        if (!id) {
            throw new ServiceError('Missing \'id\' field');
        }

        let product = await Product.findOne({
            where: { id },
            attributes: ['id', 'name', 'description', 'options', 'price', 'image', 'restaurantID', 'createdAt', 'updatedAt'],
            include: [{
                model: Product.sequelize.models.Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });
        if (!product) {
            throw new ServiceError('Product not found');
        }

        const ratings = await Rating.findAll({ where: { productID: product.id } });

        if (ratings.length > 0) {
            const totalRatings = ratings.length;
            const totalRate = ratings.reduce((acc, curr) => acc + curr.rate, 0);
            const averageRating = totalRate / totalRatings;

            product = { ...product.toJSON(), averageRating };
        }

        return product;

    }

    static async getAll(restaurantId) {
        if (!restaurantId) throw new ServiceError('Missing \'restaurantId\' field');

        let products = await Product.findAll({
            where: { restaurantID: restaurantId },
            attributes: ['id', 'name', 'description', 'options', 'price', 'image', 'restaurantID', 'createdAt', 'updatedAt'],
            include: [{
                model: Product.sequelize.models.Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });

        products = await Promise.all(products.map(async (product) => {
            const ratings = await Rating.findAll({ where: { productID: product.id } });

            if (ratings.length > 0) {
                const totalRatings = ratings.length;
                const totalRate = ratings.reduce((acc, curr) => acc + curr.rate, 0);
                const averageRating = totalRate / totalRatings;

                return { ...product.toJSON(), averageRating };
            }

        }));

        return products;
    }


}

export default ProductService;
