// process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

// import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@/routes/v1/index.route';
import ApiUserRoute from '@routes/v1/apiUser.route';

const app = new App([new IndexRoute(), new ApiUserRoute()]);

app.listen();
