// This is the config files for the swagger

import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tradeful Experimental API",
      version: "1.0.0",
      description: "API connecting homeowners with tradespeople",
      contact: {
        name: "API Support",
        url: "https://tradeful.ie",
        email: "georgeoleary2002@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.prod.tradeful.ie",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header", 
          name: "X-API-Key",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
