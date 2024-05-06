import { info } from 'console';
import { version } from 'os';
import { title } from 'process';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'Swagger document API',
        version: '0.1.0',
        description: 'Backend API',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/**/*.js'],
};

export default options;
