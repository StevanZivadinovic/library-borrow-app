
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';

const getDbUsers = async (
  credentials: Partial<Record<'email' | 'password', unknown>>
): Promise<User | null> => {
  if (!credentials.email || !credentials.password) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, credentials.email.toString()))
    .limit(1);

  if (user.length === 0) return null;

  const isPasswordValid = await compare(
    credentials.password.toString(),
    user[0].password
  );

  if (!isPasswordValid) return null;

  return {
    id: user[0].id.toString(),
    email: user[0].email,
    name: user[0].fullName,
  } as User;
};

export default getDbUsers;
