import express from 'express';
import RatingController from './../controllers/rating.controller.js';


const ratingRouter = express.Router();

ratingRouter.get('/rating/:productID', RatingController.getRating);
ratingRouter.post('/rating', RatingController.rate);
ratingRouter.get('/rating/avg/:productID', RatingController.rateAverage);

export default ratingRouter;
