import { Schema, model } from 'mongoose';

export interface Locations {
  state?: string;
  capital?: string;
  slogan?: string;
  senatorialDistricts?: string[];
  lgas?: string[];
  landmass?: string;
  population?: string;
  dialect?: string;
  map?: string;
  latitude?: string;
  longitude?: string;
  website?: string;
  region?: string;
  createdDate?: Date;
  createdBy?: string;
  pastGovernors?: string[];
  borders?: string[];
  knownFor?: string[];
}

// Define the schema for the state
const locationSchema = new Schema({
  state: {
    type: String
  },
  capital: {
    type: String
  },
  slogan: {
    type: String
  },
  senatorialDistricts: {
    type: [String]
  },
  lgas: {
    type: [String]
  },
  landmass: {
    type: String
  },
  population: {
    type: String
  },
  dialect: {
    type: String
  },
  map: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  website: {
    type: String
  },
  region: {
    type: String
  },
  createdDate: {
    type: Date
  },
  createdBy: {
    type: String,
    required: true
  },
  pastGovernors: {
    type: [String]
  },
  borders: {
    type: [String]
  },
  knownFor: {
    type: [String]
  }
});

export const locationModel = model<Locations>('Location', locationSchema);
