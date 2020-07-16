import { Router } from 'express';

import sellerController from './app/controllers/SellerController';
import clientController from './app/controllers/ClientController';

const routes = new Router();

// Sellers Routes
routes.get('/sellers', sellerController.index);
routes.get('/sellers/:id', sellerController.show);
routes.post('/sellers', sellerController.store);
routes.put('/sellers/:id', sellerController.update);
routes.delete('/sellers/:id', sellerController.destroy);

// Clients Routes
routes.get('/clients', clientController.index);
routes.get('/clients/:id', clientController.show);
routes.post('/clients', clientController.store);
routes.put('/clients/:id', clientController.update);
routes.delete('/clients/:id', clientController.destroy);

export default routes;
