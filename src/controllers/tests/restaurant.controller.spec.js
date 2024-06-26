import RestaurantController from '../restaurant.controller.js';
import RestaurantService from '../../services/restaurant.service.js';
import { handleServiceError } from '../../utils/serviceError.util.js';

jest.mock('../../services/restaurant.service.js', () => ({
    create: jest.fn(),
    list: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    login: jest.fn(),
    delete: jest.fn()
}));

jest.mock('../../utils/serviceError.util.js');

describe('RestaurantController', () => {
    describe('createRestaurant', () => {
        let req, res;

        beforeEach(() => {
            req = {
                body: { name: 'Test Restaurant', username: 'testuser', password: 'password123' },
                file: { path: 'test-image-path' },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        it('should create a new restaurant and return 201 status', async () => {
            const mockRestaurant = { id: 1, name: 'Test Restaurant', username: 'testuser', logo: 'image-url' };
            // Corrigindo o mockResolvedValue para retornar uma Promise
            RestaurantService.create.mockResolvedValue(mockRestaurant);

            // Aguardando a conclusão da operação assíncrona
            await RestaurantController.createRestaurant(req, res);

            expect(RestaurantService.create).toHaveBeenCalledWith(req.body, req.file);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockRestaurant);
        });

        it('should handle errors and call handleServiceError', async () => {
            const error = new Error('Some error');
            // Corrigindo o mockRejectedValue para retornar uma Promise
            RestaurantService.create.mockRejectedValue(error);

            // Aguardando a conclusão da operação assíncrona
            await RestaurantController.createRestaurant(req, res);

            expect(RestaurantService.create).toHaveBeenCalledWith(req.body, req.file);
            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('deleteRestaurant', () => {
        let req, res;
        beforeEach(() => {
            req = {
                restaurant: { id: 1 },
                body: { name: 'Test Restaurant', username: 'testuser', password: 'password123' },
                file: { path: 'test-image-path' },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn(),
            };
        });

        /*Verifica se RestaurantService.delete é chamado corretamente:
        Chama RestaurantController.deleteRestaurant com req e res.
        Verifica se RestaurantService.delete foi chamado com o id correto (req.restaurant.id).*/

        it('should call RestaurantService.delete with the correct parameters', async () => {
            await RestaurantController.deleteRestaurant(req, res);

            expect(RestaurantService.delete).toHaveBeenCalledWith(req.restaurant.id);
        });

        /*Teste: Verifica o retorno do status 204:
        Chama RestaurantController.deleteRestaurant com req e res.
        Verifica se res.status foi chamado com 204 e se res.send foi chamado (indicando uma resposta bem-sucedida e vazia).*/

        it('should return a 204 No Content status code if the deletion is successful', async () => {
            await RestaurantController.deleteRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('updateRestaurant', () => {
        let req, res;

        beforeEach(() => {
            req = {
                restaurant: { id: 1 },
                body: { name: 'Updated Restaurant', username: 'updateduser', password: 'newpassword123' },
                file: { path: 'new-image-path' }
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn()
            };
        });
        /*Teste de Sucesso:Mockamos a função RestaurantService.update para resolver com um restaurante atualizado simulado.
        Chamamos updateRestaurant com os objetos req e res mockados.
    Verificação:
        Verificamos se RestaurantService.update foi chamado com os parâmetros corretos.
        Verificamos se res.status foi chamado com o status 200.
        Verificamos se res.json foi chamado com o restaurante atualizado simulado.
 */
        it('should update a restaurant and return 200 status with the updated restaurant', async () => {
            const mockUpdatedRestaurant = { id: 1, name: 'Updated Restaurant', username: 'updateduser', logo: 'new-image-url' };
            RestaurantService.update.mockResolvedValue(mockUpdatedRestaurant);

            await RestaurantController.updateRestaurant(req, res);

            expect(RestaurantService.update).toHaveBeenCalledWith(req.restaurant.id, req.body, req.file);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedRestaurant);
        });

        /*Teste de Erro: Mockamos a função RestaurantService.update para rejeitar com um erro simulado.
        Chamamos RestaurantController.updateRestaurant com os objetos req e res mockados.
        Verificação:
            Verificamos se RestaurantService.update foi chamado com os parâmetros corretos.
            Verificamos se handleServiceError foi chamado com o erro simulado e o objeto res.*/

        it('should handle errors and call handleServiceError', async () => {
            const error = new Error('Some error');
            RestaurantService.update.mockRejectedValue(error);

            await RestaurantController.updateRestaurant(req, res);

            expect(RestaurantService.update).toHaveBeenCalledWith(req.restaurant.id, req.body, req.file);
            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });
    });

    describe('listRestaurants', () => {
        // Teste para garantir que o método listRestaurants retorne a lista de restaurantes.
        it('should list all restaurants', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockRestaurants = [
                { id: 'restaurant_id_1', name: 'Restaurant 1' },
                { id: 'restaurant_id_2', name: 'Restaurant 2' }
            ];

            RestaurantService.list.mockResolvedValue(mockRestaurants);

            await RestaurantController.listRestaurants(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockRestaurants);
        });

        // Teste para garantir que o método listRestaurants lide corretamente com erros.
        it('should handle error when listing restaurants', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Test Error');

            RestaurantService.list.mockRejectedValue(error);

            await RestaurantController.listRestaurants(req, res);

            expect(handleServiceError).toHaveBeenCalledWith(error, res);
        });

        describe('getRestaurant', () => {
            // Teste para garantir que o método getRestaurant retorne um restaurante pelo ID e username.
            it('should get a restaurant by ID and username and return it', async () => {
                const req = {
                    params: { id: 'restaurant_id' },
                    body: { username: 'test_user' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const mockRestaurant = { id: 'restaurant_id', name: 'Test Restaurant' };

                RestaurantService.get.mockResolvedValue(mockRestaurant);

                await RestaurantController.getRestaurant(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(mockRestaurant);
            });

            // Teste para garantir que o método getRestaurant lide corretamente com erros.
            it('should handle error when getting a restaurant', async () => {
                const req = {
                    params: { id: 'restaurant_id' },
                    body: { username: 'test_user' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const error = new Error('Test Error');

                RestaurantService.get.mockRejectedValue(error);

                await RestaurantController.getRestaurant(req, res);

                expect(handleServiceError).toHaveBeenCalledWith(error, res);
            });
        });
        describe('getRestaurant', () => {
            // Teste para garantir que o método getRestaurant retorne um restaurante pelo ID e username.
            it('should get a restaurant by ID and username and return it', async () => {
                const req = {
                    params: { id: 'restaurant_id' },
                    body: { username: 'test_user' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const mockRestaurant = { id: 'restaurant_id', name: 'Test Restaurant' };

                RestaurantService.get.mockResolvedValue(mockRestaurant);

                await RestaurantController.getRestaurant(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(mockRestaurant);
            });

            // Teste para garantir que o método getRestaurant lide corretamente com erros.
            it('should handle error when getting a restaurant', async () => {
                const req = {
                    params: { id: 'restaurant_id' },
                    body: { username: 'test_user' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const error = new Error('Test Error');

                RestaurantService.get.mockRejectedValue(error);

                await RestaurantController.getRestaurant(req, res);

                expect(handleServiceError).toHaveBeenCalledWith(error, res);
            });
        });
        describe('authenticate', () => {
            // Teste para garantir que o método authenticate retorne um token de autenticação válido.
            it('should authenticate and return a token', async () => {
                const req = {
                    body: { username: 'test_user', password: 'test_password' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const mockToken = 'mock_token';
    
                RestaurantService.login.mockResolvedValue(mockToken);
    
                await RestaurantController.authenticate(req, res);
    
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({ token: mockToken });
            });
    
            // Teste para garantir que o método authenticate lide corretamente com erros.
            it('should handle error when authenticating', async () => {
                const req = {
                    body: { username: 'test_user', password: 'test_password' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
                const error = new Error('Test Error');
    
                RestaurantService.login.mockRejectedValue(error);
    
                await RestaurantController.authenticate(req, res);
    
                expect(handleServiceError).toHaveBeenCalledWith(error, res);
            });
    
            // Teste para garantir que o método authenticate retorne um erro quando as credenciais estão ausentes.
            it('should return an error when credentials are missing', async () => {
                const req = {
                    body: { username: '', password: '' }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };
    
                await RestaurantController.authenticate(req, res);
    
                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalledWith({ error: 'Username and password are required' });
            });
        });
    });
});
