import CategoryController from '../category.controller.js';
import CategoryService from '../../services/category.service.js';
import { handleServiceError } from '../../utils/serviceError.util.js';


jest.mock('../../services/category.service.js' , () =>({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn()
}));

jest.mock('../../utils/serviceError.util.js');

describe('CategoryController', () => {

    describe('createCategory', () => {
        //Simula a criação de uma categoria e verifica se a resposta tem status 201 e retorna a categoria criada.
        it('should create a category and return status 201 with the category', async () => {
            const req = {
                body: { name: 'Test Category' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockCategory = { id: 1, name: 'Test Category' };

            CategoryService.create.mockResolvedValue(mockCategory);

            await CategoryController.createCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });
        //Simula um erro durante a criação da categoria e verifica se a função handleServiceError é chamada com o erro e a resposta.
        it('should handle error when creating a category', async () => {
            const req = {
                body: { name: 'Test Category' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Test Error');

            CategoryService.create.mockRejectedValue(error);

            await CategoryController.createCategory(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('deleteCategory', () => {
        //Simula a exclusão de uma categoria e verifica se a resposta tem status 204.
        it('should delete a category and return status 204', async () => {
            const req = {
                body: { id: 1 },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                end: jest.fn(),
            };

            CategoryService.delete.mockResolvedValue();

            await CategoryController.deleteCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.end).toHaveBeenCalled();
        });

        //Simula um erro durante a exclusão da categoria e verifica se a função handleServiceError é chamada com o erro e a resposta.
        it('should handle error when deleting a category', async () => {
            const req = {
                body: { id: 1 },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                end: jest.fn(),
            };
            const error = new Error('Test Error');

            CategoryService.delete.mockRejectedValue(error);

            await CategoryController.deleteCategory(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('updateCategory', () => {
        //Simula a atualização de uma categoria e verifica se a resposta retorna a categoria atualizada.
        it('should update a category and return the updated category', async () => {
            const req = {
                body: { id: 1, data: { name: 'Updated Category' } },
                restaurant: { id: 1 },
            };
            const res = {
                json: jest.fn(),
            };
            const mockCategory = { id: 1, name: 'Updated Category' };

            CategoryService.update.mockResolvedValue(mockCategory);

            await CategoryController.updateCategory(req, res);

            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });

        // Simula um erro durante a atualização da categoria e verifica se a função handleServiceError é chamada com o erro e a resposta.
        it('should handle error when updating a category', async () => {
            const req = {
                body: { id: 1, data: { name: 'Updated Category' } },
                restaurant: { id: 1 },
            };
            const res = {
                json: jest.fn(),
            };
            const error = new Error('Test Error');

            CategoryService.update.mockRejectedValue(error);

            await CategoryController.updateCategory(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('getCategory', () => {
        //Simula a recuperação de uma categoria específica e verifica se a resposta retorna a categoria.
        it('should get a category and return it', async () => {
            const req = {
                params: { id: 1 }
            };
            const res = {
                json: jest.fn()
            };
            const mockCategory = { id: 1, name: 'Test Category' };

            CategoryService.get.mockResolvedValue(mockCategory);

            await CategoryController.getCategory(req, res);

            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });

        //Simula um erro durante a recuperação da categoria e verifica se a função handleServiceError é chamada com o erro e a resposta.
        it('should handle error when getting a category', async () => {
            const req = {
                params: { id: 1 }
            };
            const res = {
                json: jest.fn()
            };
            const error = new Error('Test Error');

            CategoryService.get.mockRejectedValue(error);

            await CategoryController.getCategory(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('getAllCategories', () => {
        // Simula a recuperação de todas as categorias e verifica se a resposta retorna a lista de categorias.
        it('should get all categories and return them', async () => {
            const req = {
                params: { id: 1 }
            };
            const res = {
                json: jest.fn()
            };
            const mockCategories = [
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' }
            ];

            CategoryService.getAll.mockResolvedValue(mockCategories);

            await CategoryController.getAllCategories(req, res);

            expect(res.json).toHaveBeenCalledWith(mockCategories);
        });
        //Simula um erro durante a recuperação de todas as categorias e verifica se a função handleServiceError é chamada com o erro e a resposta.
        it('should handle error when getting all categories', async () => {
            const req = {
                params: { id: 1 }
            };
            const res = {
                json: jest.fn()
            };
            const error = new Error('Test Error');

            CategoryService.getAll.mockRejectedValue(error);

            await CategoryController.getAllCategories(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });
});
