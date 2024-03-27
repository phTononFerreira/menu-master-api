import APIMessages from "../utils/messages.util.js";
import ServiceError from "../utils/serviceError.util.js";
import RatingService from './../services/rating.service.js';

class RatingController {
  static async getRating(req, res) {
    try {
      const rating = await RatingService.get(req.body.productID);
      res.json(rating);
    } catch (error) {
      console.log(error)
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async rate(req, res) {
    try {
      const rating = await RatingService.rate(req.body);
      res.status(201).json(rating);
    } catch (error) {
      console.log(error)
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async rateAverage(req, res) {
    try {
      const avgRating = await RatingService.rateAverage(req.body.productID);
      res.json(avgRating);
    } catch (error) {
      console.log(error)
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }
}

export default RatingController;
