import express from 'express';
import bodyParser from 'body-parser';
import ProductRoutes from './routes/ProductRoutes.js';
import UserRoute from './routes/UserRoute.js';
import CartRoutes from './routes/CartRoutes.js';
import cors from 'cors'; // Import gói cors

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', ProductRoutes);
app.use('/api', UserRoute);
app.use('/api', CartRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://${port}`);
});
