import { Iuser } from '../database/model/usermodel';

export interface CustomRequest {
  User: Iuser;
  payload: any;
  file: object;
  params: object;
  query: object;
  path: object;
}
