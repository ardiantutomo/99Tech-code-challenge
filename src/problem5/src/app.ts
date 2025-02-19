import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import resourceRoutes from "./routes/resourceRoutes";

const app = express();

app.use(express.json());
app.use("/resources", resourceRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Crude Server API",
      version: "1.0.0",
      description: "API documentation for the Crude Server",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
