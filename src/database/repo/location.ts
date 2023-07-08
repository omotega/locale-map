import { locationModel, Locations } from '../model/location';
import { Request } from 'express';

async function searchByRegion(region: any) {
  return locationModel.find({ region: region }).lean().exec();
}

async function searchByState(state: any): Promise<Locations | null> {
  return locationModel.findOne({ state: state }).lean().exec();
}

async function searchByLga(lgas: any): Promise<Locations | null> {
  return locationModel.findOne({ lgas: lgas }).lean().exec();
}

async function searchByRegionWithState(region: string) {
  return locationModel
    .find({ region: region })
    .select(
      '-lgas -knownFor -borders -pastGovernors -createdBy -createdDate -website -longitude -latitude -slogan -capital -senatorialDistricts -landmass -population -dialect -map '
    )
    .lean()
    .exec();
}

async function searchForStateWithLga(state: string): Promise<Locations | null> {
  return locationModel
    .findOne({ state: state })
    .select(
      ' -knownFor -borders -pastGovernors -createdBy -createdDate -website -longitude -latitude -slogan -capital -senatorialDistricts -landmass -population -dialect -map -region  '
    )
    .lean()
    .exec();
}

export default {
  searchByRegion,
  searchByLga,
  searchByState,
  searchByRegionWithState,
  searchForStateWithLga
};
