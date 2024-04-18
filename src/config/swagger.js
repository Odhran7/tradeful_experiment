// This is the config files for the swagger

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Tradeful Experimental API',
        version: '1.0.0',
        description: 'API for validating a problem statement',
        contact: {
          name: 'API Support',
          url: 'https://tradeful.pro',
          email: 'georgeoleary2002@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
        {
          url: 'https://gifted-worm-umbrella.cyclic.app',
          description: 'Production server',
        }
      ],
    },
    apis: ['./src/routes/**/*.js'],
  };
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;