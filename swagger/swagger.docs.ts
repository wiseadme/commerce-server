import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Commerce Server API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: [ './swagger/*.controller.yaml']
};
export const swaggerDocs = swaggerJsDoc(options);
console.log(swaggerDocs);
