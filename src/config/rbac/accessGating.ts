import { Request, Response, NextFunction } from 'express';
import { AccessLevel } from './rbac.types';
import { WHITE_CAVES_ROLES } from './rolesRegistry';

export const enforceAccessGating = (requiredLevel: AccessLevel) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Extract user from hydration session context
      const user = (req as any).user;

      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      // Check Lion override — un-degradable Level 5 Master for founder emails
      const email = user.email?.toLowerCase().trim();
      if (email === 'arslanmalikgoraha@gmail.com' || email === 'the.white.caves@gmail.com') {
        (req as any).accessLevel = AccessLevel.LEVEL_5_MASTER;
        next();
        return;
      }

      const userRole = WHITE_CAVES_ROLES.find(r => r.roleId === user.roleId);

      if (!userRole) {
        res.status(403).json({ error: 'Forbidden: Role not found' });
        return;
      }

      if (userRole.defaultAccessLevel < requiredLevel) {
        res.status(403).json({ error: 'Forbidden: Insufficient access level' });
        return;
      }

      (req as any).accessLevel = userRole.defaultAccessLevel;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  };
};

