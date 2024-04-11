import CategoryService from "../services/category.service.js";
import APIMessages from "../utils/messages.util.js";
import ServiceError from "../utils/serviceError.util.js";


class CategoryController {
  static async createCategory(req, res) {
    try {
      console.log(req.body, req.restaurant.id)
      const category = await CategoryService.create(req.body, req.restaurant.id);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async deleteCategory(req, res) {
    try {
      await CategoryService.delete(req.body.id, req.restaurant.id);
      res.status(204).end();
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async updateCategory(req, res) {
    try {
      const category = await CategoryService.update(req.body.id, req.body.data, req.restaurant.id);
      res.json(category);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await CategoryService.get(req.params.id);
      res.json(category);
    } catch (error) {
      if (error instanceof ServiceError) {
        console.log(error)
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: APIMessages.INTERNAL_SERVER_ERROR });
      }
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAll(req.params.id);
      res.json(categories);
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

export default CategoryController;
