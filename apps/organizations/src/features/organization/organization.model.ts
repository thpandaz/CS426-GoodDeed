import { Schema, model } from 'mongoose';
import { Organization } from '../../types/organization.js';

const locationSchema = new Schema({
  city: { 
    type: String, 
    required: true,
    trim: true,
  },
  country: { 
    type: String, 
    required: true,
    trim: true,
  },
  state: { 
    type: String, 
    required: true,
    trim: true,
  },
  cordinates: {
    lat: { 
      type: Number, 
      required: true,
      min: -90,
      max: 90,
    },
    long: { 
      type: Number, 
      required: true,
      min: -180,
      max: 180,
    },
  },
});

const reputationSchema = new Schema({
  score: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5,
    get: (v: number) => Number(v.toFixed(1)),
    set: (v: number) => Number(v.toFixed(1)),
  },
  amount_of_reviews: { 
    type: Number, 
    default: 0,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
});

const organizationSchema = new Schema<Organization>(
  {
    uuid: { 
      type: String, 
      required: true, 
      trim: true,
    },
    clerkId: { 
      type: String, 
      required: true, 
      trim: true,
    },
    name: { 
      type: String, 
      required: true,
      trim: true,
      minlength: [1, 'Name cannot be empty'],
    },
    email: { 
      type: String, 
      required: true, 
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email address'],
    },
    location: { 
      type: locationSchema, 
      required: true,
    },
    phone: { 
      type: String, 
      required: true,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, 'Please provide a valid phone number'],
    },
    industry: { 
      type: String, 
      required: true,
      trim: true,
      minlength: [1, 'Industry cannot be empty'],
    },
    reputation: { 
      type: reputationSchema, 
      default: () => ({
        score: 0,
        amount_of_reviews: 0,
      }),
    },
    events: [{ 
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Compound indexes
organizationSchema.index({ email: 1 }, { unique: true });
organizationSchema.index({ clerkId: 1 }, { unique: true });
organizationSchema.index({ uuid: 1 }, { unique: true });
organizationSchema.index({ 'location.city': 1, 'location.state': 1, 'location.country': 1 });
organizationSchema.index({ industry: 1 });
organizationSchema.index({ 'reputation.score': -1 });

// Text search index
organizationSchema.index({ 
  name: 'text', 
  industry: 'text',
  'location.city': 'text',
  'location.state': 'text',
  'location.country': 'text',
});

export const OrganizationModel = model<Organization>('Organization', organizationSchema); 