import { Router } from 'express';
const docRouter = Router();
import path from 'path';

import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';

const endpointPath = path.resolve('src/docs/endpoints.yaml');

const swaggerjsDocs = YAML.load(endpointPath);

docRouter.use('/', swaggerUI.serve, swaggerUI.setup(swaggerjsDocs));

export default docRouter;
