// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,                    // ← Change to 51213 if your MySQL port is different
  user: "root",
  password: "",                  // Leave empty if no password
  database: "erp_system",        // ← Make sure this matches your database name
});

const prisma = new PrismaClient({ 
  adapter,
  log: ['error']
});

async function main() {
  console.log('🌟 Seeding Premium Modern ERP Demo Data...\n');

  try {
    const org = await prisma.organization.upsert({
      where: { slug: 'acme-corp' },
      update: {},
      create: {
        name: 'Acme Corporation',
        slug: 'acme-corp',
        email: 'hello@acmecorp.com',
        phone: '+880 1711-234567',
        address: 'Level 7, Gulshan Avenue, Dhaka 1212, Bangladesh',
      },
    });

    console.log(`✅ Organization: ${org.name}`);

    await seedRolesAndPermissions(prisma);
    await seedEmployees(prisma, org.id);
    await seedProducts(prisma, org.id);
    await seedCustomers(prisma, org.id);
    await seedSuppliers(prisma, org.id);

    console.log('\n🎉 Premium demo seeding completed successfully!');

  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message || error);
  } finally {
    await prisma.$disconnect();
  }
}

// ====================== Helper Functions ======================

async function seedRolesAndPermissions(prisma: PrismaClient) {
  const permissions = [
    { resource: 'dashboard', action: 'view' },
    { resource: 'product', action: 'create' },
    { resource: 'product', action: 'read' },
    { resource: 'product', action: 'update' },
    { resource: 'employee', action: 'read' },
    { resource: 'employee', action: 'create' },
    { resource: 'invoice', action: 'create' },
    { resource: 'report', action: 'read' },
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { resource_action: { resource: p.resource, action: p.action } },
      update: {},
      create: p,
    });
  }

  await prisma.role.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: { name: 'Super Admin', description: 'Full system access', isSystem: true },
  });

  console.log('✅ Roles & Permissions seeded');
}

async function seedEmployees(prisma: PrismaClient, organizationId: string) {
  const employees = [
    { employeeCode: 'EMP001', firstName: 'Rahim', lastName: 'Khan', email: 'rahim@acmecorp.com',   department: 'Engineering', designation: 'CTO', salary: 185000, status: 'ACTIVE' },
    { employeeCode: 'EMP002', firstName: 'Nadia', lastName: 'Ahmed', email: 'nadia@acmecorp.com',   department: 'Sales',      designation: 'Head of Sales', salary: 125000, status: 'ACTIVE' },
    { employeeCode: 'EMP003', firstName: 'Sabbir', lastName: 'Hossain', email: 'sabbir@acmecorp.com', department: 'Finance',    designation: 'Finance Manager', salary: 95000, status: 'ACTIVE' },
    { employeeCode: 'EMP004', firstName: 'Ayesha', lastName: 'Rahman', email: 'ayesha@acmecorp.com', department: 'Marketing',   designation: 'Marketing Manager', salary: 88000, status: 'ACTIVE' },
  ];

  for (const e of employees) {
    await prisma.employee.upsert({
      where: { employeeCode: e.employeeCode },
      update: {},
      create: { ...e, organizationId, joinedAt: new Date('2024-01-10') },
    });
  }
  console.log('✅ Employees seeded');
}

async function seedProducts(prisma: PrismaClient, organizationId: string) {
  const products = [
    { name: "MacBook Pro 16\" M4 Pro", sku: "MBP16-M4-2026", category: "Laptops", price: 3499.99, costPrice: 2899.00, stockCount: 18, reorderLevel: 5, unit: "pcs", organizationId },
    { name: "Sony WH-1000XM6 Headphones", sku: "SONY-XM6-BLK", category: "Audio", price: 449.00, costPrice: 360.00, stockCount: 92, reorderLevel: 20, unit: "pcs", organizationId },
    { name: "Herman Miller Aeron Chair", sku: "AERON-REM-2025", category: "Furniture", price: 1499.99, costPrice: 1050.00, stockCount: 12, reorderLevel: 8, unit: "pcs", organizationId },
    { name: "Dell UltraSharp 32\" 6K Monitor", sku: "DELL-U3225QE", category: "Monitors", price: 899.99, costPrice: 720.00, stockCount: 35, reorderLevel: 10, unit: "pcs", organizationId },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: p,
    });
  }
  console.log('✅ Products seeded');
}

async function seedCustomers(prisma: PrismaClient, organizationId: string) {
  const customers = [
    { name: "TechVision Solutions Ltd", email: "contact@techvision.com", phone: "+880 1911-556677", address: "Banani, Dhaka", creditLimit: 500000 },
    { name: "Greenfield Corporate", email: "procurement@greenfield.com", phone: "+880 1812-334455", address: "Gulshan-1, Dhaka", creditLimit: 800000 },
    { name: "Summit Pharmaceuticals", email: "office@summitpharma.com", phone: "+880 1713-998877", address: "Uttara, Dhaka", creditLimit: 300000 },
  ];

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { email: c.email! },
      update: {},
      create: { ...c, organizationId },
    });
  }
  console.log('✅ Customers seeded');
}

async function seedSuppliers(prisma: PrismaClient, organizationId: string) {
  const suppliers = [
    { name: "Global Tech Distributors", email: "sales@globaltechbd.com", phone: "+880 1715-223344", address: "Chittagong" },
    { name: "Office Furniture Hub BD", email: "info@officehub.com", phone: "+880 1819-112233", address: "Dhaka" },
  ];

  for (const s of suppliers) {
    await prisma.supplier.upsert({
      where: { email: s.email! },
      update: {},
      create: { ...s, organizationId },
    });
  }
  console.log('✅ Suppliers seeded');
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });