/**
 * migrateAndSeedOrganization.ts
 * Non-destructive migration and seed script for White Caves Corporate Hierarchy.
 *
 * Safe to run multiple times — uses upsert semantics throughout.
 * Zero-Data-Loss guarantee: existing records are updated, never deleted.
 *
 * Run: npx tsx src/scripts/migrateAndSeedOrganization.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  seedDepartments,
  migrateLegacyVirtualStaff,
  ingestMasterWorkforceGrid,
  ensureSuperUser,
  generateMigrationReport,
} from './migrateAndSeedOrganization.migrate';

export * from './migrateAndSeedOrganization.data';
export * from './migrateAndSeedOrganization.migrate';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../secrets/.env') });

async function run(): Promise<void> {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || '';
  if (!uri) throw new Error('MONGODB_URI or DATABASE_URL not set in secrets/.env');

  console.log('[Migration] Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('[Migration] Connected.');

  const db = mongoose.connection.db!;

  await seedDepartments(db);
  await migrateLegacyVirtualStaff(db);
  await ingestMasterWorkforceGrid(db, __dirname);
  await ensureSuperUser(db, process.env.SUPER_USER_EMAIL);
  await generateMigrationReport(db);

  await mongoose.disconnect();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  run().catch(err => {
    console.error('[Migration] FATAL:', err);
    process.exit(1);
  });
}

export { run };

