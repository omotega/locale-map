import { Router } from 'express';
import locationController from '../controllers/location';
import addAuthorization from '../middleawre/auth';
import CacheMiddleware from '../middleawre/cache';

const locationRouter = Router();

locationRouter
  .route('/searchregion')
  .get(addAuthorization, CacheMiddleware, locationController.searchByRegion);
locationRouter
  .route('/searchstate')
  .get(addAuthorization, CacheMiddleware, locationController.searchByState);
locationRouter
  .route('/searchlga')
  .get(addAuthorization, CacheMiddleware, locationController.searchByLga);
locationRouter
  .route('/searchstatewithlga')
  .get(
    addAuthorization,
    CacheMiddleware,
    locationController.searchForStateWithLga
  );
locationRouter
  .route('/searchregionwithstate')
  .get(
    addAuthorization,
    CacheMiddleware,
    locationController.searchRegionwithState
  );

export default locationRouter;
