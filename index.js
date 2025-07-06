import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { port, url } from './config/dbConfig.js';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.js';

//import of all the controllers
import { authUserManagement } from './src/controllers/authUserManagement.controller.js';
import marketRoutes from './src/routes/market.routes.js';

const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

// Initial route
app.get('/', (_req, res) => {
    res.send(`<div><h4>Your API is connected successfully. </br>${new Date()}</h4></div>`);
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use('/authUser', authUserManagement);
app.use('/market', marketRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
    console.log(`API docs available at ${url}/api-docs`);
});



