import { Router } from 'express';
import locationController from '../controllers/location';
import addAuthorization from '../middleawre/auth';

const locationRouter = Router();

locationRouter
  .route('/searchregion')
  .get(addAuthorization, locationController.searchByRegion);
locationRouter
  .route('/searchstate')
  .get(addAuthorization, locationController.searchByState);
locationRouter
  .route('/searchlga')
  .get(addAuthorization, locationController.searchByLga);
locationRouter
  .route('/searchstatewithlga')
  .get(addAuthorization, locationController.searchForStateWithLga);
locationRouter
  .route('/searchregionwithstate')
  .get(addAuthorization, locationController.searchRegionwithState);

export default locationRouter;
