'use client';

import type {
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from '@/lib/definitions/comment';

export async function createComment(data: CreateCommentRequest): Promise<CreateCommentResponse> {
  const response = await fetch('/api/v1/comments', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // TODO: build proper error message
    const { messages } = (await response.json()) as { messages: string[] };
    console.error(`Network Error: fail to fetch createComments\n${messages.join('\n')}`);

    throw new Error('네트워크 에러입니다. 다시 시도해주세요.');
  }

  return (await response.json()) as CreateCommentResponse;
}

export async function updateComment(
  id: number,
  data: UpdateCommentRequest
): Promise<UpdateCommentResponse> {
  const response = await fetch(`/api/v1/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // TODO: build proper error message
    const { messages } = (await response.json()) as { messages: string[] };
    console.error(`Network Error: fail to fetch updateComment\n${messages.join('\n')}`);

    throw new Error('네트워크 에러입니다. 다시 시도해주세요.');
  }

  return (await response.json()) as UpdateCommentResponse;
}

export async function deleteComment(id: number) {
  const response = await fetch(`/api/v1/comments/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    // TODO: build proper error message
    const { messages } = (await response.json()) as { messages: string[] };
    console.error(`Network Error: fail to fetch deleteComment\n${messages.join('\n')}`);

    throw new Error('네트워크 에러입니다. 다시 시도해주세요.');
  }
}
