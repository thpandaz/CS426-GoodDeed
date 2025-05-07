import { Types } from 'mongoose';

export interface Location {
  city: string;
  country: string;
  state: string;
  cordinates: {
    lat: number;
    long: number;
  };
}

export interface Reputation {
  score: number;
  amount_of_reviews: number;
}

export interface Organization {
  _id?: Types.ObjectId;
  uuid: string;
  clerkId: string;
  name: string;
  email: string;
  location: Location;
  phone: string;
  industry: string;
  reputation: Reputation;
  events: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateOrganizationDto = Omit<Organization, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateOrganizationDto = Partial<CreateOrganizationDto>; 