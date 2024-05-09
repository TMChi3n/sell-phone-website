import express from "express";
import bodyParser from "body-parser";
import ProductRoutes from "./routes/productRoutes.js";
import UserRoute from "./routes/userRoute.js";
import cors from "cors"; // Import gói cors
import CartRoute from "./routes/cartRoutes.js";
import OrderRoute from "./routes/orderRoute.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger_docs.js";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", ProductRoutes);
app.use("/api/v1", UserRoute);
app.use("/api/v1", CartRoute);
app.use("/api/v1", OrderRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
