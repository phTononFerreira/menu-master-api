import express from 'express';
import RestaurantController from '../controllers/restaurant.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import validateUpload from '../middlewares/validateUpload.middleware.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/restaurant', RestaurantController.getRestaurant);
restaurantRouter.post('/restaurant', validateUpload("logo"), RestaurantController.createRestaurant);
restaurantRouter.put('/restaurant', authenticate, validateUpload("logo"), RestaurantController.updateRestaurant);
restaurantRouter.delete('/restaurant', authenticate, RestaurantController.deleteRestaurant);
restaurantRouter.get('/restaurants', RestaurantController.listRestaurants);

restaurantRouter.post('/restaurant/login', RestaurantController.authenticate);

export default restaurantRouter;
