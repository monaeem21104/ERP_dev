// app/actions/auth.ts
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function registerUser(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const companyName = formData.get('companyName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!firstName || !lastName || !companyName || !email || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'An account with this email already exists.' };
    }

    // 2. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a URL-friendly slug for the organization
    const baseSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

    // 4. Create User, Organization, and link them as OWNER in one single transaction
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        // Prisma Nested Writes: This creates the linking table AND the Organization simultaneously
        organizations: {
          create: {
            roleInOrg: 'OWNER',
            organization: {
              create: {
                name: companyName,
                slug: slug,
              }
            }
          }
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Failed to create account. Please try again.' };
  }
}