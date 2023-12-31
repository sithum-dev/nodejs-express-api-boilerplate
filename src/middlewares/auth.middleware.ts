import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.header('Authorization').split('Bearer ')[1] || null;

        if (Authorization) {
            const secretKey: string = config.get('secretKey');
            const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
            const userId = verificationResponse.id;
            const findUser = userModel.findById(userId);

            if (findUser) {
                req.body.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default authMiddleware;
