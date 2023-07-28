import { CrateApiUserDto } from '@/dtos/apiUser.dto';
import HttpException from '@exceptions/HttpException';
import { ApiUser, TokenData } from '@/interfaces/apiUser.interface';
import ApiUserModel from '@/models/apiUser.model';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
const uuidAPIKey = require('uuid-apikey');
import config from 'config';
import jwt from 'jsonwebtoken';

class ApiUserService {
    public apiUserModel = ApiUserModel;

    public async createNewApiUser(userData: CrateApiUserDto): Promise<ApiUser> {
        if (isEmpty(userData)) throw new HttpException(400, 'Empty User Data');

        const { username, password } = userData;

        const apiKey = uuidAPIKey.create();

        const hashedPassword: String = await bcrypt.hash(password, 10);

        const data = {
            username: username,
            password: hashedPassword,
            uuid: apiKey.uuid,
        };

        const newUser: ApiUser = await new this.apiUserModel(data).save();

        return newUser;
    }
    public async authenticateApiUser(userdata: CrateApiUserDto): Promise<any> {
        const { username, password } = userdata;

        const findUser: ApiUser = await this.apiUserModel.findOne({ username: username }).populate('officeId').lean();
        if (!findUser) throw new HttpException(409, `User not found`);

        const isPasswordMatching: boolean = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, 'Wrong password');

        const tokenData = this.createToken(findUser);

        const responce = { user: findUser, token: tokenData };

        return responce;
    }

    public createToken(user: ApiUser): TokenData {
        const secretKey: string = config.get('secretKey');
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: jwt.sign(user, secretKey, { expiresIn }) };
    }
}

export default ApiUserService;
