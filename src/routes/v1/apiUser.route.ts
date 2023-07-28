import { Router } from 'express';
import ApiUserController from '@controllers/apiUser.controller';
import Route from '@interfaces/routes.interface';

class ApiUserRoute implements Route {
    public path = '/v1/apiUser';
    public router = Router();
    public apiUserController = new ApiUserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.apiUserController.createNewApiUser);
        this.router.post(`${this.path}/office`, this.apiUserController.createNewApiOffice);
        this.router.get(`${this.path}/byId/:id`, this.apiUserController.findApiUserByOfficeId);

        this.router.post(`${this.path}/authenticate`, this.apiUserController.authenticateApiUser);
    }
}

export default ApiUserRoute;
