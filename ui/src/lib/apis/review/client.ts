'use client';

import type { HttpErrorResponse } from '@/lib/definitions/error';
import type {
  CreateReplyRequest,
  CreateReplyResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  UpdateReplyRequest,
  UpdateReplyResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from '@/lib/definitions/review';

export async function createReview(data: CreateReviewRequest): Promise<CreateReviewResponse> {
  const response = await fetch('/api/v1/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const { messages } = (await response.json()) as HttpErrorResponse;

    // TODO: build proper error message
    console.error(
      `status: ${response.status}\nstatusText: ${response.statusText}\nmessages:\n${messages.join('\n')}`
    );

    throw new Error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
  }

  return (await response.json()) as CreateReviewResponse;
}

export async function updateReview(
  id: number,
  data: UpdateReviewRequest
): Promise<UpdateReviewResponse> {
  const response = await fetch(`/api/v1/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const { messages } = (await response.json()) as HttpErrorResponse;

    // TODO: build proper error message
    console.error(
      `status: ${response.status}\nstatusText: ${response.statusText}\nmessages:\n${messages.join('\n')}`
    );

    throw new Error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
  }

  return (await response.json()) as UpdateReviewResponse;
}

export async function deleteReview(id: number) {
  const response = await fetch(`/api/v1/reviews/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    // TODO: build proper error message
    throw new Error(`Network Error: Failed to delete review: ${response.statusText}`);
  }
}

export async function createReply(
  reviewId: number,
  data: CreateReplyRequest
): Promise<CreateReplyResponse> {
  const response = await fetch(`/api/v1/reviews/${reviewId}/replies`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // TODO: build proper error message
    throw new Error(`Network Error: Failed to fetch create reply: ${response.statusText}`);
  }

  return (await response.json()) as CreateReplyResponse;
}

export async function deleteReply(reviewId: number, replyId: number) {
  const response = await fetch(`/api/v1/reviews/${reviewId}/replies/${replyId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    // TODO: build proper error message
    throw new Error(`Network Error: Failed to fetch delete reply: ${response.statusText}`);
  }
}

export async function updateReply(
  reviewId: number,
  replyId: number,
  data: UpdateReplyRequest
): Promise<UpdateReplyResponse> {
  const response = await fetch(`/api/v1/reviews/${reviewId}/replies/${replyId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // TODO: build proper error message
    throw new Error(`Network Error: Failed to fetch update reply: ${response.statusText}`);
  }

  return (await response.json()) as UpdateReplyResponse;
}
