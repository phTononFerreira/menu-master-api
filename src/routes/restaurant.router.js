import express from 'express';
import RestaurantController from '../controllers/restaurant.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import uploadValidation from '../middlewares/uploadValidation.middleware.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/restaurant/:username', RestaurantController.getRestaurant);
restaurantRouter.post('/restaurant', uploadValidation("logo"), RestaurantController.createRestaurant);
restaurantRouter.put('/restaurant', authenticate, uploadValidation("logo"), RestaurantController.updateRestaurant);
restaurantRouter.delete('/restaurant', authenticate, RestaurantController.deleteRestaurant);
restaurantRouter.get('/restaurants', RestaurantController.listRestaurants);

restaurantRouter.post('/restaurant/login', RestaurantController.authenticate);

export default restaurantRouter;
