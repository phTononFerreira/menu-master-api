
import Category from './../models/category.model.js';
import ServiceError from './../utils/serviceError.util.js';

class CategoryService {
    static async create(data, restaurantId) {
        data.restaurantID = restaurantId;
        console.log(restaurantId);
        const category = await Category.create(data);
        return category;
    }

    static async delete(id, restaurantId) {
        const category = await Category.findOne({ where: { id, restaurantID: restaurantId } });
        if (!category) {
            throw new ServiceError('Category not found');
        }
        await category.destroy();
    }

    static async update(id, data, restaurantId) {
        const category = await Category.findOne({ where: { id, restaurantID: restaurantId } });
        if (!category) {
            throw new ServiceError('Category not found');
        }
        await category.update(data);
        return category;
    }

    static async get(id) {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            throw new ServiceError('Category not found');
        }
        return category;
    }

    static async getAll(restaurantId) {
        console.log(restaurantId)
        const categories = await Category.findAll({ where: { restaurantID: restaurantId } });
        return categories;
    }
}

export default CategoryService;
