import { Request, Response, NextFunction } from 'express';
import { clerkClient, verifyToken } from '@clerk/clerk-sdk-node';
import { baseLogger } from './logger.js';

const logger = baseLogger.child({ module: 'AuthMiddleware' });

export interface AuthOptions {
  apiKey?: string;                    // Clerk API key (defaults to CLERK_API_KEY env var)
  jwtKey?: string;                    // Clerk JWT verification key (defaults to CLERK_JWT_KEY env var)
  publicRoutes?: string[];            // Array of public routes that don't require auth
  publicRoutePatterns?: RegExp[];     // Array of regex patterns for public routes
  userInfoInReq?: boolean;            // Whether to add user info to req object (default: true)
  organizationInfoInReq?: boolean;    // Whether to add organization info to req object (default: false)
  handleUnauthorized?: (req: Request, res: Response) => void; // Custom unauthorized handler
}

// Default options
const defaultOptions: AuthOptions = {
  publicRoutes: [],
  publicRoutePatterns: [],
  userInfoInReq: true,
  organizationInfoInReq: false,
};

// Extend the Express Request type to include Clerk user
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId?: string;
        sessionId?: string;
        orgId?: string;
        getToken?: () => Promise<string | null>;
      };
      user?: any; // The full user object from Clerk
      organization?: any; // The full organization object from Clerk
    }
  }
}

// Helper function to check if a route is public
const isPublicRoute = (req: Request, options: AuthOptions): boolean => {
  const { publicRoutes = [], publicRoutePatterns = [] } = options;
  
  // Check exact route matches
  if (publicRoutes.includes(req.path)) {
    return true;
  }
  
  // Check regex patterns
  if (publicRoutePatterns.some(pattern => pattern.test(req.path))) {
    return true;
  }
  
  return false;
};

// Default unauthorized handler
const defaultUnauthorizedHandler = (_req: Request, res: Response): void => {
  res.status(401).json({
    status: 401,
    error: 'Unauthorized',
    message: 'Authentication required to access this resource',
  });
};

// Extract token from request
const extractTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

// Create auth middleware
export const createAuthMiddleware = (options: AuthOptions = {}) => {
  const opts = { ...defaultOptions, ...options };
  
  // Return the middleware function
  return async (req: Request, res: Response, next: NextFunction) => {
    // Allow public routes to bypass authentication
    if (isPublicRoute(req, opts)) {
      return next();
    }

    try {
      // Extract token from request
      const token = extractTokenFromRequest(req);
      if (!token) {
        throw new Error('No authorization token provided');
      }
      
      // Verify the token
      const session = await verifyToken(token, {
        secretKey: options.apiKey || process.env.CLERK_SECRET_KEY,
        jwtKey: options.jwtKey || process.env.CLERK_JWT_KEY,
      });
      
      if (!session || !session.sub) {
        throw new Error('Invalid session');
      }
      
      // Set auth info in request
      req.auth = {
        userId: session.sub,
        sessionId: session.sid,
        orgId: session.org_id,
      };
      
      // If userInfoInReq is true, fetch the user info
      if (opts.userInfoInReq && req.auth?.userId) {
        try {
          const user = await clerkClient.users.getUser(req.auth.userId);
          req.user = user;
        } catch (error) {
          logger.error('Error fetching user data', { error, userId: req.auth.userId });
        }
      }
      
      // If organizationInfoInReq is true, fetch the organization info
      if (opts.organizationInfoInReq && req.auth?.orgId) {
        try {
          const organization = await clerkClient.organizations.getOrganization({
            organizationId: req.auth.orgId,
          });
          req.organization = organization;
        } catch (error) {
          logger.error('Error fetching organization data', { error, orgId: req.auth.orgId });
        }
      }
      
      next();
    } catch (error) {
      logger.warn('Authentication failed', { 
        path: req.path, 
        method: req.method,
        error: error instanceof Error ? error.message : String(error) 
      });
      
      // Use custom unauthorized handler if provided, otherwise use default
      const unauthorizedHandler = opts.handleUnauthorized || defaultUnauthorizedHandler;
      unauthorizedHandler(req, res);
    }
  };
};

// Helper to get current authenticated user from request
export const getCurrentUser = (req: Request) => {
  return req.user;
};

// Helper to get current authenticated organization from request
export const getCurrentOrganization = (req: Request) => {
  return req.organization;
};

// Helper to require specific permissions
export const requirePermissions = (permissions: string[], options: { allRequired?: boolean } = {}) => {
  const { allRequired = false } = options;
  
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = req.user?.permissions || [];
    
    const hasPermission = allRequired 
      ? permissions.every(p => userPermissions.includes(p))
      : permissions.some(p => userPermissions.includes(p));
    
    if (hasPermission) {
      return next();
    }
    
    logger.warn('Permission denied', {
      userId: req.auth?.userId,
      path: req.path,
      requiredPermissions: permissions,
      userPermissions,
    });
    
    res.status(403).json({
      status: 403,
      error: 'Forbidden',
      message: 'You do not have the required permissions to access this resource',
    });
  };
};

// Helper to require organization membership
export const requireOrganizationMembership = (options: { roles?: string[] } = {}) => {
  const { roles = [] } = options;
  
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.orgId) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
        message: 'Organization membership required to access this resource',
      });
    }
    
    // If roles are specified, check that the user has one of the required roles
    if (roles.length > 0) {
      const userRole = req.user?.organizationMemberships?.find(
        (m: any) => m.organization.id === req.auth?.orgId
      )?.role;
      
      if (!userRole || !roles.includes(userRole)) {
        logger.warn('Organization role requirement not met', {
          userId: req.auth?.userId,
          orgId: req.auth?.orgId,
          requiredRoles: roles,
          userRole,
        });
        
        return res.status(403).json({
          status: 403,
          error: 'Forbidden',
          message: 'You do not have the required role to access this resource',
        });
      }
    }
    
    next();
  };
}; 