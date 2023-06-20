import { Router } from 'express';
const docRouter = Router();

import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';

const swaggerjsDocs = YAML.load('./endpoints.yaml');

docRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerjsDocs));

export default docRouter;
