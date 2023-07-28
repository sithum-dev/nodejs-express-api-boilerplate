process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import dotenv from 'dotenv';
dotenv.config();

class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';

        // this.app.use(express.json({ limit: '25mb' }));
        // this.app.use(express.urlencoded({ limit: '25mb' }));

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.initMongoose();
    }

    public listen() {
        logger.info(this.port);
        this.app.listen(process.env.PORT || 3000, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan('combined', { stream }));
            this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
        } else {
            this.app.use(morgan('dev', { stream }));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());

        // Add headers
        this.app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            // Pass to next layer of middleware
            next();
        });
    }

    private initMongoose() {
        mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }, () => {
            logger.info(`CONNECTED TO DATABASE`);
        });
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
