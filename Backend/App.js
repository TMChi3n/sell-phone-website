import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import ProductRoutes from './routes/ProductRoutes.js';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors'; // Import gói cors
import CartRoute from './routes/CartRoutes.js';
import OrderRoute from './routes/OrderRoute.js';
import options from './config/swagger_docs.js';

const app = express();
const port = process.env.PORT || 3001;
const specs = swaggerJSDoc(options);
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', ProductRoutes);
app.use('/api', UserRoute);
app.use('/api', CartRoute);
app.use('/api', OrderRoute);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
