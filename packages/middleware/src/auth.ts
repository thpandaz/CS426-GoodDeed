// import 'dotenv/config'; // ensure CLERK_PUBLISHABLE_KEY & CLERK_SECRET_KEY are loaded
import { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} from '@clerk/express';
import { baseLogger } from './logger.js';

const logger = baseLogger.child({ module: 'AuthMiddleware' });

/**
 * Initialize Clerk's middleware.
 * Attach this at the top of your Express app:
 *
 *    app.use(clerkMiddleware());
 *
 * This will populate `req.auth` with the Auth object when a valid session is present.
 */
export const initAuth: () => RequestHandler = () => clerkMiddleware();

/**
 * Middleware to protect routes that require authentication.
 * Usage:
 *    app.use('/api/protected', requireAuth(), router);
 */
export const protect: typeof requireAuth = requireAuth;

/**
 * Helper to fetch the current user (full profile) from Clerk.
 */
export async function getCurrentUser(req: Request) {
  const { userId } = getAuth(req);
  if (!userId) {
    return null;
  }
  try {
    return await clerkClient.users.getUser(userId);
  } catch (err) {
    logger.error('Error fetching user', { error: err, userId });
    return null;
  }
}

/**
 * Helper to fetch the current organization (full object) from Clerk.
 */
export async function getCurrentOrganization(req: Request) {
  const { orgId } = getAuth(req);
  if (!orgId) {
    return null;
  }
  try {
    return await clerkClient.organizations.getOrganization({ organizationId: orgId });
  } catch (err) {
    logger.error('Error fetching organization', { error: err, orgId });
    return null;
  }
}

/**
 * Require that the user has one (or all) of the specified permissions.
 * Leverages Auth.has({ permission })
 */
export function requirePermissions(
  permissions: string[],
  options: { allRequired?: boolean } = {}
): RequestHandler {
  const { allRequired = false } = options;
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const hasPerm = allRequired
      ? permissions.every(p => auth.has({ permission: p }))
      : permissions.some(p => auth.has({ permission: p }));
    if (hasPerm) {
      return next();
    }
    logger.warn('Permission denied', {
      userId: auth.userId,
      path: req.path,
      required: permissions,
    });
    res.status(403).json({
      status: 403,
      error: 'Forbidden',
      message: 'You do not have the required permissions',
    });
  };
}

/**
 * Require that the user is a member of the current organization,
 * and optionally that they hold one of the specified roles.
 */
export function requireOrganizationMembership(options: { roles?: string[] } = {}): RequestHandler {
  const { roles = [] } = options;
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    if (!auth.orgId) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
        message: 'Organization membership required',
      });
    }
    if (roles.length > 0 && !auth.has({ role: roles[0] /* or check any role */ })) {
      logger.warn('Org role requirement not met', {
        userId: auth.userId,
        orgId: auth.orgId,
        requiredRoles: roles,
      });
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
        message: 'Insufficient organization role',
      });
    }
    next();
  };
}
