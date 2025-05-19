const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager Application',
      version: '1.0.0',
      description: 'API documentation for the Task Manager Application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust if routes are in a different location
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
