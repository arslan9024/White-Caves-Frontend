/**
 * @deprecated PRISMA MIGRATION – This Mongoose model is scheduled for removal.
 * Replacement: prisma/schema.prisma + src/lib/prisma.ts
 * Do NOT add new fields here. Use Prisma schema instead.
 */
import mongoose from 'mongoose';
import { inventoryPropertyFields } from './inventory/schemaFields.js';
import { attachInventoryPropertyIndexes } from './inventory/indexes.js';
import { attachInventoryPropertyStatics } from './inventory/statics.js';

const InventoryPropertySchema = new mongoose.Schema(inventoryPropertyFields, {
  timestamps: true,
});

attachInventoryPropertyIndexes(InventoryPropertySchema);
attachInventoryPropertyStatics(InventoryPropertySchema);

const InventoryProperty =
  mongoose.models.InventoryProperty || mongoose.model('InventoryProperty', InventoryPropertySchema);

export { InventoryPropertySchema, inventoryPropertyFields };
export default InventoryProperty;
