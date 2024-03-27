// This is the config files for the swagger

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Yung Booking API',
        version: '1.0.0',
        description: 'API for connecting Yung booking system with salon',
        contact: {
          name: 'API Support',
          url: 'https://yung.ie',
          email: 'georgeoleary2002@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/**/*.js'],
  };
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;