import swaggerJSDoc from 'swagger-jsdoc';
import { url } from './dbConfig.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My ES6 API',
            version: '1.0.0',
            description: 'API documentation using Swagger and ES6',
        },
        servers: [
            {
                url: `${url}`,
            },
        ],
    },
    apis: ['./src/controllers/*.controller.js'], // NOTE: Path must be correct
};

const specs = swaggerJSDoc(options);
export default specs;