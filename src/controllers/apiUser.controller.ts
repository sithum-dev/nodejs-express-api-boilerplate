import { NextFunction, Request, Response } from 'express';
import { ApiUserDto } from '@/dtos/apiUser.dto';
import ApiUserService from '@/services/apiUser.service';

class ApiUserController {
    public apiUserService = new ApiUserService();

    public createNewApiUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: ApiUserDto = req.body;
            const newUserData = await this.apiUserService.createNewApiUser(userData);

            res.status(201).json({ data: newUserData, message: 'new api user saved successfully' });
        } catch (error) {
            next(error);
        }
    };

    public authenticateApiUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: ApiUserDto = req.body;
            const userAuthData = await this.apiUserService.authenticateApiUser(userData);

            res.status(201).json({ data: userAuthData });
        } catch (error) {
            next(error);
        }
    };

    public createNewApiOffice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: ApiUserDto = req.body;
            const newUserData = await this.apiUserService.createApiOffice(userData);

            res.status(201).json({ data: newUserData, message: 'new api office user saved successfully' });
        } catch (error) {
            next(error);
        }
    };

    public findApiUserByOfficeId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const officeId = req.params.id;
            const userData = await this.apiUserService.findApiUserByOfficeId(officeId);

            res.status(201).json({ data: userData, message: 'user data' });
        } catch (error) {
            next(error);
        }
    };
}

export default ApiUserController;
