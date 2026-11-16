import fs from 'node:fs';
import path from 'node:path';
import type { Db } from 'mongodb';
import {
  CORE_DEPARTMENTS,
  GRID_TO_SEEDED_DEPARTMENT_CODE,
  type DeptLevel,
  type EmpType,
  type PRole,
  type PStatus,
} from './migrateAndSeedOrganization.data';

export async function seedDepartments(db: Db): Promise<void> {
  console.log('[Migration] Seeding 12 Corporate Departments...');
  const deptColl = db.collection('department_nodes');

  for (const dept of CORE_DEPARTMENTS) {
    await deptColl.updateOne(
      { code: dept.code },
      {
        $setOnInsert: { createdAt: new Date() },
        $set: {
          slug: dept.slug,
          title: dept.title,
          level: 'DEPARTMENT' as DeptLevel,
          parentDeptId: null,
          order: dept.order,
          color: dept.color,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    const parent = await deptColl.findOne({ code: dept.code });
    if (!parent) continue;

    for (const sub of dept.subDepts) {
      await deptColl.updateOne(
        { code: sub.code },
        {
          $setOnInsert: { createdAt: new Date() },
          $set: {
            slug: sub.slug,
            title: sub.title,
            level: 'SUB_DEPARTMENT' as DeptLevel,
            parentDeptId: parent._id,
            order: sub.order,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }
  }
  console.log('[Migration] ✓ Departments seeded.');
}

export async function migrateLegacyVirtualStaff(db: Db): Promise<number> {
  console.log('[Migration] Migrating legacy VirtualStaff to Personnel...');
  const staffColl = db.collection('virtual_staff');
  const personnelColl = db.collection('personnels');

  const legacyStaff = await staffColl.find({}).toArray();
  let migrated = 0;

  for (const staff of legacyStaff) {
    const employeeId = `WC-AI-${String(staff.staffId || staff._id).slice(-6).toUpperCase()}`;
    const existing = await personnelColl.findOne({ employeeId });
    if (existing) continue;

    await personnelColl.insertOne({
      employeeId,
      fullName: staff.name || 'Unknown',
      employmentType: 'AI_AGENT' as EmpType,
      role: 'SUPERVISOR' as PRole,
      isVirtual: true,
      systemPrompt: staff.systemRole || '',
      status: 'STANDBY' as PStatus,
      departmentId: null,
      subDepartmentId: null,
      teamSquadId: null,
      reportsTo: null,
      lineage: [],
      title: staff.title,
      color: staff.color,
      gender: staff.gender,
      assignedTasks: staff.assignedTasks || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    migrated++;
  }
  console.log(`[Migration] ✓ Migrated ${migrated} legacy VirtualStaff records to Personnel.`);
  return migrated;
}

export async function ingestMasterWorkforceGrid(db: Db, basePath: string): Promise<number> {
  console.log('[Migration] Ingesting Virtual Staff from master-workforce-grid...');
  const deptColl = db.collection('department_nodes');
  const personnelColl = db.collection('personnels');
  const gridPath = path.resolve(basePath, '../config/ai-command-center/master-workforce-grid.json');
  let gridIngested = 0;

  if (fs.existsSync(gridPath)) {
    const gridData = JSON.parse(fs.readFileSync(gridPath, 'utf8'));

    if (gridData.executiveAiPartner) {
      const exec = gridData.executiveAiPartner;
      const employeeId = `WC-AI-${exec.id.toUpperCase()}`;
      await personnelColl.updateOne(
        { employeeId },
        {
          $setOnInsert: { createdAt: new Date() },
          $set: {
            fullName: exec.name,
            employmentType: 'AI_AGENT' as EmpType,
            role: 'DIRECTOR' as PRole,
            isVirtual: true,
            status: 'ACTIVE' as PStatus,
            title: exec.title || 'Executive AI Partner',
            color: '#8B5CF6',
            avatar: exec.avatar || '⚡',
            assignedTasks: ['Executive Autonomous Override', 'Guard Node Governance'],
            lineage: [],
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
      gridIngested++;
    }

    for (const d of gridData.departments || []) {
      const seededDeptCode = GRID_TO_SEEDED_DEPARTMENT_CODE[d.deptCode];
      const deptDoc = seededDeptCode ? await deptColl.findOne({ code: seededDeptCode }) : null;

      if (d.manager) {
        const mgr = d.manager;
        const employeeId = `WC-AI-MGR-${mgr.id.toUpperCase()}`;
        const updateDoc: any = {
          fullName: mgr.name,
          employmentType: 'AI_AGENT' as EmpType,
          role: 'MANAGER' as PRole,
          isVirtual: true,
          status: 'ACTIVE' as PStatus,
          title: mgr.title,
          color: d.color,
          avatar: mgr.avatar,
          assignedTasks: mgr.responsibilities || [],
          departmentId: deptDoc ? deptDoc._id : null,
          lineage: [],
          updatedAt: new Date(),
        };

        const res = await personnelColl.findOneAndUpdate(
          { employeeId },
          { $setOnInsert: { createdAt: new Date() }, $set: updateDoc },
          { upsert: true, returnDocument: 'after' }
        );
        if (res && deptDoc && !deptDoc.directorOrManagerId) {
          await deptColl.updateOne({ _id: deptDoc._id }, { $set: { directorOrManagerId: res._id } });
        }
        gridIngested++;
      }

      for (const sup of d.supervisors || []) {
        const employeeId = `WC-AI-SUP-${sup.id.toUpperCase()}`;
        await personnelColl.updateOne(
          { employeeId },
          {
            $setOnInsert: { createdAt: new Date() },
            $set: {
              fullName: sup.name,
              gender: sup.gender || 'Female',
              employmentType: 'AI_AGENT' as EmpType,
              role: 'SUPERVISOR' as PRole,
              isVirtual: true,
              status: 'ACTIVE' as PStatus,
              title: sup.title,
              color: d.color,
              assignedTasks: sup.tasks || [],
              departmentId: deptDoc ? deptDoc._id : null,
              lineage: [],
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
        gridIngested++;
      }
    }
    console.log(`[Migration] ✓ Ingested ${gridIngested} personnel profiles from master-workforce-grid.`);
  }
  return gridIngested;
}

export async function ensureSuperUser(db: Db, superEmail?: string): Promise<void> {
  if (!superEmail) return;
  const personnelColl = db.collection('personnels');
  console.log(`[Migration] Ensuring Super User (${superEmail}) is Managing Director...`);
  await personnelColl.updateOne(
    { email: superEmail },
    {
      $setOnInsert: { createdAt: new Date(), lineage: [], isVirtual: false },
      $set: {
        employeeId: 'WC-DIR-000',
        fullName: 'Managing Director',
        email: superEmail,
        employmentType: 'EXECUTIVE' as EmpType,
        role: 'DIRECTOR' as PRole,
        status: 'ACTIVE' as PStatus,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
  console.log('[Migration] ✓ Super User Managing Director record ensured.');
}

export async function generateMigrationReport(db: Db): Promise<void> {
  const deptColl = db.collection('department_nodes');
  const personnelColl = db.collection('personnels');

  const deptCount = await deptColl.countDocuments({ level: 'DEPARTMENT' });
  const subCount = await deptColl.countDocuments({ level: 'SUB_DEPARTMENT' });
  const personnelCount = await personnelColl.countDocuments();
  const standbyCount = await personnelColl.countDocuments({ status: 'STANDBY' });
  const activeCount = await personnelColl.countDocuments({ status: 'ACTIVE' });

  console.log('\n[Migration] ═══ SUMMARY ═══');
  console.log(`  Corporate Departments : ${deptCount}`);
  console.log(`  Sub-Department Desks  : ${subCount}`);
  console.log(`  Personnel Records     : ${personnelCount}`);
  console.log(`    → ACTIVE            : ${activeCount}`);
  console.log(`    → STANDBY           : ${standbyCount}`);
  console.log('[Migration] ✓ Complete — Zero data was deleted.\n');
}

