import Product from "../models/product.model.js";
import Rating from "../models/rating.model.js";
import ServiceError from "../utils/serviceError.util.js";

class RatingService {
    static async get(productID) {
        if (!productID) {
            throw new ServiceError('Missing required fields');
        }

        const product = await Product.findByPk(productID);
        if (!product) {
            throw new ServiceError('Product not found');
        }

        const rating = await Rating.findAll({ where: { productID: productID } });
        return rating;
    }

    static async rate(data) {
        if (!data.productID || !data.rate) {
            throw new ServiceError('Missing required fields');
        }

        const product = await Product.findByPk(data.productID);
        if (!product) {
            throw new ServiceError('Product not found');
        }

        const rating = await Rating.create(data);
        return rating;
    }

    static async rateAverage(productID) {
        if (!productID) {
            throw new ServiceError('Missing required fields');
        }

        const product = await Product.findByPk(productID);
        if (!product) {
            throw new ServiceError('Product not found');
        }

        const ratings = await Rating.findAll({ where: { productID } });

        if (ratings.length === 0) {
            throw new ServiceError('No ratings found for this product');
        }

        const totalRatings = ratings.length;
        const totalRate = ratings.reduce((acc, curr) => acc + curr.rate, 0);
        const averageRating = totalRate / totalRatings;

        return { averageRating };

    }
}

export default RatingService;
