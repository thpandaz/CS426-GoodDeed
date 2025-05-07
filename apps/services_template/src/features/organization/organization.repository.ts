import { Types } from 'mongoose';
import { Organization } from '../../types/organization.js';
import { OrganizationModel } from './organization.model.js';

export class OrganizationRepository {
  async findAll(): Promise<Organization[]> {
    try {
      const docs = await OrganizationModel.find().lean().exec();
      return docs.map(this.mapOrganization);
    } catch (error) {
      throw new Error(`Failed to find organizations: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findById(id: string): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OrganizationModel.findById(id).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to find organization by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findByClerkId(clerkId: string): Promise<Organization | null> {
    try {
      const doc = await OrganizationModel.findOne({ clerkId }).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to find organization by clerk ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findByEmail(email: string): Promise<Organization | null> {
    try {
      const doc = await OrganizationModel.findOne({ email: email.toLowerCase() }).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to find organization by email: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async create(data: Partial<Organization>): Promise<Organization> {
    try {
      if (data.email) {
        data.email = data.email.toLowerCase();
      }
      const doc = await OrganizationModel.create(data);
      return this.mapOrganization(doc.toObject());
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('email')) {
          throw new Error('Organization with this email already exists');
        }
        if (error.message.includes('clerkId')) {
          throw new Error('Organization with this clerk ID already exists');
        }
      }
      throw new Error(`Failed to create organization: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async update(id: string, data: Partial<Organization>): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      if (data.email) {
        data.email = data.email.toLowerCase();
      }
      const doc = await OrganizationModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      ).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        if (error.message.includes('email')) {
          throw new Error('Organization with this email already exists');
        }
        if (error.message.includes('clerkId')) {
          throw new Error('Organization with this clerk ID already exists');
        }
      }
      throw new Error(`Failed to update organization: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async delete(id: string): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OrganizationModel.findByIdAndDelete(id).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to delete organization: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async addEvent(id: string, eventId: string): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OrganizationModel.findByIdAndUpdate(
        id,
        { $addToSet: { events: eventId.trim() } },
        { new: true }
      ).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to add event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async removeEvent(id: string, eventId: string): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OrganizationModel.findByIdAndUpdate(
        id,
        { $pull: { events: eventId.trim() } },
        { new: true }
      ).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to remove event: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateReputation(id: string, score: number, newReviewCount: number): Promise<Organization | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OrganizationModel.findByIdAndUpdate(
        id,
        { 
          $set: { 
            'reputation.score': Number(score.toFixed(1)),
            'reputation.amount_of_reviews': newReviewCount
          } 
        },
        { new: true }
      ).lean().exec();
      return doc ? this.mapOrganization(doc) : null;
    } catch (error) {
      throw new Error(`Failed to update reputation: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private mapOrganization(doc: any): Organization {
    if (!doc) {
      throw new Error('Cannot map null document to Organization');
    }
    return {
      _id: doc._id,
      uuid: doc.uuid,
      clerkId: doc.clerkId,
      name: doc.name,
      email: doc.email.toLowerCase(),
      location: {
        city: doc.location.city,
        country: doc.location.country,
        state: doc.location.state,
        cordinates: {
          lat: Number(doc.location.cordinates.lat),
          long: Number(doc.location.cordinates.long),
        },
      },
      phone: doc.phone,
      industry: doc.industry,
      reputation: {
        score: Number(doc.reputation.score),
        amount_of_reviews: Number(doc.reputation.amount_of_reviews),
      },
      events: Array.isArray(doc.events) ? doc.events : [],
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    };
  }
} 