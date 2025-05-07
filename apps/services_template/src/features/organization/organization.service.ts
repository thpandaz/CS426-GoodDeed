import { Types } from 'mongoose';
import { Organization, CreateOrganizationDto, UpdateOrganizationDto } from '../../types/organization.js';
import { OrganizationRepository } from './organization.repository.js';
import { createOrganizationSchema, updateOrganizationSchema, addEventSchema, removeEventSchema, updateReputationSchema } from './organization.schema.js';

export class OrganizationService {
  private repository: OrganizationRepository;

  constructor() {
    this.repository = new OrganizationRepository();
  }

  async create(data: CreateOrganizationDto): Promise<Organization> {
    const validatedData = createOrganizationSchema.parse({ body: data });
    return this.repository.create({
      ...validatedData.body,
      uuid: new Types.ObjectId().toHexString(),
    });
  }

  async findById(id: string): Promise<Organization | null> {
    return this.repository.findById(id);
  }

  async findByClerkId(clerkId: string): Promise<Organization | null> {
    return this.repository.findByClerkId(clerkId);
  }

  async findByUuid(uuid: string): Promise<Organization | null> {
    return this.repository.findByEmail(uuid);
  }

  async update(id: string, data: UpdateOrganizationDto): Promise<Organization | null> {
    const validatedData = updateOrganizationSchema.parse({ 
      params: { id }, 
      body: data 
    });

    if (data.reputation) {
      if (typeof data.reputation.score !== 'number' || 
          typeof data.reputation.amount_of_reviews !== 'number') {
        throw new Error('Invalid reputation format');
      }
    }

    return this.repository.update(validatedData.params.id, validatedData.body);
  }

  async delete(id: string): Promise<Organization | null> {
    return this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return this.repository.findByEmail(email);
  }

  async addEvent(id: string, eventId: string): Promise<Organization | null> {
    const validatedData = addEventSchema.parse({ params: { id }, body: { eventId } });
    return this.repository.addEvent(validatedData.params.id, validatedData.body.eventId);
  }

  async removeEvent(id: string, eventId: string): Promise<Organization | null> {
    const validatedData = removeEventSchema.parse({ params: { id, eventId } });
    return this.repository.removeEvent(validatedData.params.id, validatedData.params.eventId);
  }

  async updateReputation(id: string, score: number): Promise<Organization | null> {
    const validatedData = updateReputationSchema.parse({ params: { id }, body: { score } });
    const org = await this.repository.findById(id);
    if (!org) return null;

    const newScore = (org.reputation.score * org.reputation.amount_of_reviews + score) / 
                    (org.reputation.amount_of_reviews + 1);

    return this.repository.updateReputation(
      id, 
      newScore,
      org.reputation.amount_of_reviews + 1
    );
  }
} 