import ProductController from '../product.controller.js';
import ProductService from '../../services/product.service.js';
import { handleServiceError } from '../../utils/serviceError.util.js';


jest.mock('../../utils/serviceError.util.js');

jest.mock('../../services/product.service.js', () => ({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn()
}));

describe('ProductController', () => {
    describe('createProduct', () => {
        //Verifica se o produto é criado corretamente e a resposta contém o status 201 com o produto criado.
        it('should create a product and return status 201 with the product', async () => {
            const req = {
                body: { name: 'Test Product' },
                file: { path: 'test/path' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockProduct = { id: 1, name: 'Test Product' };

            ProductService.create.mockResolvedValue(mockProduct);

            await ProductController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        //Simula um erro ao criar um produto e verifica se o erro é tratado corretamente pela função handleServiceError.
        it('should handle error when creating a product', async () => {
            const req = {
                body: { name: 'Test Product' },
                file: { path: 'test/path' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Test Error');

            ProductService.create.mockRejectedValue(error);

            await ProductController.createProduct(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('deleteProduct', () => {
        //Verifica se o produto é deletado corretamente e a resposta contém o status 204.
        it('should delete a product and return status 204', async () => {
            const req = {
                body: { id: 1 },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            ProductService.delete.mockResolvedValue();

            await ProductController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        //Simula um erro ao deletar um produto e verifica se o erro é tratado corretamente pela função handleServiceError.
        it('should handle error when deleting a product', async () => {
            const req = {
                body: { id: 1 },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const error = new Error('Test Error');

            ProductService.delete.mockRejectedValue(error);

            await ProductController.deleteProduct(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('updateProduct', () => {
        //Verifica se o produto é atualizado corretamente e a resposta contém o status 200 com o produto atualizado.
        it('should update a product and return status 200 with the product', async () => {
            const req = {
                body: { id: 1, name: 'Updated Product' },
                file: { path: 'test/path' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockProduct = { id: 1, name: 'Updated Product' };

            ProductService.update.mockResolvedValue(mockProduct);

            await ProductController.updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        //Simula um erro ao atualizar um produto e verifica se o erro é tratado corretamente pela função handleServiceError.
        it('should handle error when updating a product', async () => {
            const req = {
                body: { id: 1, name: 'Updated Product' },
                file: { path: 'test/path' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Test Error');

            ProductService.update.mockRejectedValue(error);

            await ProductController.updateProduct(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
        /*Simula um caso onde a atualização falha porque o produto não é encontrado. 
        O ProductService.update é configurado para rejeitar a promessa com um erro específico (PRODUCT_NOT_FOUND). 
        O teste verifica se o handleServiceError é chamado corretamente com esse erro.*/
        it('should handle product not found error when updating', async () => {
            const req = {
                body: { id: 1, name: 'Nonexistent Product' },
                file: { path: 'test/path' },
                restaurant: { id: 1 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Product not found');
            error.code = 'PRODUCT_NOT_FOUND';

            ProductService.update.mockRejectedValue(error);

            await ProductController.updateProduct(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });

        describe('getProduct', () => {
            // Teste para garantir que o método getProduct retorne um produto pelo ID.
            it('should get a product by ID and return it', async () => {
                const req = {
                    params: { id: 'product_id' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const mockProduct = { id: 'product_id', name: 'Test Product' };
    
                ProductService.get.mockResolvedValue(mockProduct);
    
                await ProductController.getProduct(req, res);
    
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(mockProduct);
            });
    
            // Teste para garantir que o método getProduct lide corretamente com erros.
            it('should handle error when getting a product', async () => {
                const req = {
                    params: { id: 'product_id' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const error = new Error('Test Error');
    
                ProductService.get.mockRejectedValue(error);
    
                await ProductController.getProduct(req, res);
    
                expect(handleServiceError).toHaveBeenCalledWith(error, res);
            });
        });
    
        describe('getAllProducts', () => {
            // Teste para garantir que o método getAllProducts retorne todos os produtos de um restaurante.
            it('should get all products for a restaurant and return them', async () => {
                const req = {
                    params: { restaurantId: 'restaurant_id' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const mockProducts = [
                    { id: 'product_id_1', name: 'Product 1' },
                    { id: 'product_id_2', name: 'Product 2' }
                ];
    
                ProductService.getAll.mockResolvedValue(mockProducts);
    
                await ProductController.getAllProducts(req, res);
    
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(mockProducts);
            });
    
            // Teste para garantir que o método getAllProducts lide corretamente com erros.
            it('should handle error when getting all products', async () => {
                const req = {
                    params: { restaurantId: 'restaurant_id' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const error = new Error('Test Error');
    
                ProductService.getAll.mockRejectedValue(error);
    
                await ProductController.getAllProducts(req, res);
    
                expect(handleServiceError).toHaveBeenCalledWith(error, res);
            });
        });

    });
});
