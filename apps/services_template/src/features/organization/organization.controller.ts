import { Request, Response } from 'express';
import { OrganizationService } from './organization.service.js';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../../types/organization.js';
import { ZodError } from 'zod';

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const organizationData = req.body as CreateOrganizationDto;
      const existingOrg = await this.organizationService.findByEmail(organizationData.email);
      
      if (existingOrg) {
        res.status(409).json({ message: 'Organization with this email already exists' });
        return;
      }

      const organization = await this.organizationService.create(organizationData);
      res.status(201).json(organization);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const organization = await this.organizationService.findById(id);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getByClerkId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clerkId } = req.params;
      const organization = await this.organizationService.findByClerkId(clerkId);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body as UpdateOrganizationDto;
      
      const organization = await this.organizationService.update(id, updateData);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const organization = await this.organizationService.delete(id);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  addEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { eventId } = req.body;
      
      const organization = await this.organizationService.addEvent(id, eventId);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  removeEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, eventId } = req.params;
      
      const organization = await this.organizationService.removeEvent(id, eventId);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateReputation = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { score } = req.body;
      
      const organization = await this.organizationService.updateReputation(id, score);
      
      if (!organization) {
        res.status(404).json({ message: 'Organization not found' });
        return;
      }

      res.json(organization);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };
} 