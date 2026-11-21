import express from 'express';
import UserType from '../models/UserType.js';
import ServiceCatalog from '../models/ServiceCatalog.js';
import DubaiCommunity from '../models/DubaiCommunity.js';
import { DUBAI_USER_TYPES } from './seed-dubai-platform/userTypesData.js';
import { DUBAI_SERVICES } from './seed-dubai-platform/servicesData.js';
import { buildPrimeCommunities } from './seed-dubai-platform/communitiesPrimeData.js';
import { buildGrowthCommunities } from './seed-dubai-platform/communitiesGrowthData.js';

const router = express.Router();

router.post('/seed-all', async (req, res) => {
  try {
    const results = {
      userTypes: await seedUserTypes(),
      services: await seedServices(),
      communities: await seedCommunities(),
    };

    res.json({
      success: true,
      message: 'Dubai platform data seeded successfully',
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function seedUserTypes() {
  await UserType.deleteMany({});
  const created = await UserType.insertMany(DUBAI_USER_TYPES);
  return { count: created.length, message: `Created ${created.length} user types` };
}

async function seedServices() {
  await ServiceCatalog.deleteMany({});
  const created = await ServiceCatalog.insertMany(DUBAI_SERVICES);
  return { count: created.length, message: `Created ${created.length} services` };
}

async function seedCommunities() {
  await DubaiCommunity.deleteMany({});
  const communities = [...buildPrimeCommunities(), ...buildGrowthCommunities()];
  const created = await DubaiCommunity.insertMany(communities);
  return { count: created.length, message: `Created ${created.length} communities` };
}

router.get('/user-types', async (req, res) => {
  const userTypes = await UserType.find({}).sort('typeCode');
  res.json({ success: true, count: userTypes.length, data: userTypes });
});

router.get('/services', async (req, res) => {
  const services = await ServiceCatalog.find({}).sort('displayOrder');
  res.json({ success: true, count: services.length, data: services });
});

router.get('/communities', async (req, res) => {
  const communities = await DubaiCommunity.find({}).sort('tier communityName');
  res.json({ success: true, count: communities.length, data: communities });
});

export default router;
