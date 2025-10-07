import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';

export function setupSwagger(app){
 const swaggerDoc=yamljs.load('./openapi/openapi.yaml');
 app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));
}