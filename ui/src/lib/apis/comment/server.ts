'use server';

import { unstable_noStore as noStore } from 'next/cache';

import type { ListCommentsQuery, ListCommentsResponse } from '@/lib/definitions/comment';

export async function listComments(query: ListCommentsQuery): Promise<ListCommentsResponse> {
  noStore();

  const params = Object.entries(query).reduce((acc, [key, value]) => {
    if (value) {
      acc.set(key, String(value));
    }

    return acc;
  }, new URLSearchParams());

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/comments?${params.toString()}`);

  if (!response.ok) {
    // TODO: build proper error message
    const { messages } = (await response.json()) as { messages: string[] };

    console.error(
      `status: ${response.status}\nstatusText: ${response.statusText}\nmessages:\n${messages.join('\n')}`
    );

    throw new Error(`Network Error: Failed to fetch comments list: ${response.statusText}`);
  }

  return (await response.json()) as ListCommentsResponse;
}
