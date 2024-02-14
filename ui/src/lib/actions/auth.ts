'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { User } from '@/lib/definitions/user';

// server actions must be async functions
// eslint-disable-next-line @typescript-eslint/require-await
export async function signIn() {
  redirect('/api/v1/google/sign-in');
}

export async function signOut() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/sign-out`);

  if (!response.ok) {
    // TODO: handle error
  }

  cookies().set('mrcToken', '', { expires: new Date(0) });
}

export async function getUserInfo() {
  const mrcToken = cookies().get('mrcToken')?.value;
  if (!mrcToken) return null;

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/self`, {
    headers: { authorization: `Bearer ${mrcToken}` },
  });

  if (!response.ok) {
    // TODO: handle error
    return null;
  }

  return (await response.json()) as { user: User };
}
