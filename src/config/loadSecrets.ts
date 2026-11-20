import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

/**
 * Load client-safe environment variables exclusively from the centralized
 * secrets vault OUTSIDE all Git repositories (../secrets/frontend-public.env).
 */
export function loadSecrets(): void {
  const vaultDir = fileURLToPath(new URL('../../../secrets/', import.meta.url));
  const publicEnv = path.join(vaultDir, 'frontend-public.env');
  if (fs.existsSync(publicEnv)) {
    dotenv.config({ path: publicEnv });
  }
}

loadSecrets();
