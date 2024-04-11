import { handleServiceError } from '../utils/serviceError.util.js';
import RatingService from './../services/rating.service.js';

class RatingController {
  static async getRating(req, res) {
    try {
      const rating = await RatingService.get(req.params.productID);
      res.json(rating);
    } catch (error) {
      console.log(error);
      return handleServiceError(error, res);
    }
  }
  
  static async rate(req, res) {
    try {
      const rating = await RatingService.rate(req.body);
      res.status(201).json(rating);
    } catch (error) {
      console.log(error);
      return handleServiceError(error, res);
    }
  }

  static async rateAverage(req, res) {
    try {
      const avgRating = await RatingService.rateAverage(req.params.productID);
      res.json(avgRating);
    } catch (error) {
      console.log(error);
      return handleServiceError(error, res);
    }
  }
}

export default RatingController;
