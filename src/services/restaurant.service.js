import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pkg from 'validator';
import Restaurant from '../models/restaurant.model.js';
import { uploadImage } from '../utils/cloudinary.util.js';
import ServiceError from '../utils/serviceError.util.js';

dotenv.config();

const { isUUID } = pkg;

class RestaurantService {
    static async create(data, file) {
        if (!data.name || !data.username || !data.password) {
            throw new ServiceError('Missing required fields');
        }

        if (!isValidUsername(data.username)) {
            throw new ServiceError('Username cannot contain special characters');
        }

        const existingRestaurant = await Restaurant.findOne({ where: { username: data.username } });
        if (existingRestaurant) {
            throw new ServiceError('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const imageUrl = await uploadImage(file);

        const restaurantData = {
            name: data.name,
            logo: imageUrl,
            username: data.username,
            password: hashedPassword
        };

        const restaurant = await Restaurant.create(restaurantData);
        return restaurant;
    }


    static async list() {
        const restaurants = await Restaurant.findAll({
            attributes: { exclude: ['password'] }
        });
        return restaurants;
    }

    static async get(id, usernameSearch) {
        if (!id && !usernameSearch) {
            throw new ServiceError('Invalid fields');
        }

        let restaurant;
        if (id) {
            if (!isUUID(id)) {
                throw new ServiceError('Invalid UUID for restaurant ID');
            }
            restaurant = await Restaurant.findByPk(id);
        }

        if (!restaurant && usernameSearch) {
            restaurant = await Restaurant.findOne({
                where: { username: usernameSearch },
                attributes: { exclude: ['password'] }
            });
            if (!restaurant) {
                throw new ServiceError('Restaurant not found');
            }
        }

        if (!restaurant) {
            throw new ServiceError('Restaurant not found');
        }

        return restaurant;
    }

    static async update(id, data, file) {
        if (!data.name || !data.password) {
            throw new ServiceError('Missing required fields');
        }

        const existingRestaurant = await Restaurant.findOne({ where: { id: id } });
        if (!existingRestaurant) {
            throw new ServiceError('Restaurant not found');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const imageUrl = await uploadImage(file);

        const restaurantData = {
            name: data.name,
            logo: imageUrl,
            username: existingRestaurant.username,
            password: hashedPassword
        };

        const restaurant = await Restaurant.update(restaurantData);

        return restaurant
    }

    static async delete(id) {
        if (!isUUID(id)) {
            throw new ServiceError('Invalid UUID for restaurant ID');
        }

        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            throw new ServiceError('Restaurant not found');
        }

        await restaurant.destroy();
    }

    static async login(username, password) {
        const restaurant = await Restaurant.findOne({ where: { username } });

        if (!restaurant) {
            throw new ServiceError('Restaurant not found');
        }

        const passwordMatch = await bcrypt.compare(password, restaurant.password);

        if (passwordMatch) {
            const token = jwt.sign(
                {
                    id: restaurant.id,
                    name: restaurant.name,
                    logo: restaurant.logo,
                    username: restaurant.username
                },

                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            return token;
        } else {
            throw new ServiceError('Invalid credentials');
        }
    }
}

function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(username) && !username.includes(" ");
}

export default RestaurantService;
