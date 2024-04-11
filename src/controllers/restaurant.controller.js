import RestaurantService from '../services/restaurant.service.js';
import { handleServiceError } from '../utils/serviceError.util.js';

export default class RestaurantController {

    static async createRestaurant(req, res) {
        try {
            const restaurant = await RestaurantService.create(req.body, req.file);
            res.status(201).json(restaurant);
        } catch (error) {
            console.log(error);
            handleServiceError(error, res);
        }
    }

    static async listRestaurants(req, res) {
        try {
            const restaurants = await RestaurantService.list();
            res.status(200).json(restaurants);
        } catch (error) {
            handleServiceError(error, res);
        }
    }

    static async getRestaurant(req, res) {
        try {
            const { id } = req.body;
            const { username } = req.params;

            const restaurant = await RestaurantService.get(id, username);
            res.status(200).json(restaurant);
        } catch (error) {
            handleServiceError(error, res);
        }
    }

    static async updateRestaurant(req, res) {
        try {
            const id = req.restaurant.id;
            const updatedRestaurant = await RestaurantService.update(id, req.body, req.file);
            res.status(200).json(updatedRestaurant);
        } catch (error) {
            console.log(error);
            handleServiceError(error, res);
        }
    }

    static async deleteRestaurant(req, res) {
        try {
            const id = req.restaurant.id;
            await RestaurantService.delete(id);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            handleServiceError(error, res);
        }
    }

    static async authenticate(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            const token = await RestaurantService.login(username, password);

            return res.status(200).json({ token });
        } catch (error) {
            handleServiceError(error, res);
        }
    }
}
