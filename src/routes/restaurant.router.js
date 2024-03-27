import express from 'express';
import upload from '../config/multer.config.js';
import RestaurantController from '../controllers/restaurant.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/restaurant', RestaurantController.getRestaurant);
restaurantRouter.post('/restaurant', upload.single('logo'), RestaurantController.createRestaurant);
restaurantRouter.put('/restaurant', authenticate, upload.single('logo'), RestaurantController.updateRestaurant);
restaurantRouter.delete('/restaurant', authenticate, RestaurantController.deleteRestaurant);
restaurantRouter.get('/restaurants', RestaurantController.listRestaurants);

restaurantRouter.post('/restaurant/login', RestaurantController.authenticate);

export default restaurantRouter;
