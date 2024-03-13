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
import dummyReviewList from '@/lib/dummy/review';
import dummyRepliesList from '@/lib/dummy/review-reply';

export async function createReview(data: CreateReviewRequest): Promise<CreateReviewResponse> {
  try {
    const response = await fetch('/api/v1/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
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
  } catch (error) {
    // TODO: DELETE THIS WHEN API IS READY
    return await new Promise((resolve) =>
      setTimeout(() => resolve({ review: dummyReviewList.reviews[0] }), 500)
    );
  }
}

export async function updateReview(
  id: number,
  data: UpdateReviewRequest
): Promise<UpdateReviewResponse> {
  try {
    const response = await fetch(`/api/v1/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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
  } catch (error) {
    // TODO: DELETE THIS WHEN API IS READY
    return await new Promise((resolve) =>
      setTimeout(() => resolve({ review: dummyReviewList.reviews[Number(id) - 1] }), 500)
    );
  }
}

export async function createReply(
  reviewId: number,
  data: CreateReplyRequest
): Promise<CreateReplyResponse> {
  try {
    const response = await fetch(`/api/v1/reviews/${reviewId}/replies`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // TODO: build proper error message
      throw new Error(`Network Error: Failed to fetch create reply: ${response.statusText}`);
    }

    return (await response.json()) as CreateReplyResponse;
  } catch (error) {
    // TODO: DELETE ME
    return await new Promise((resolve) =>
      setTimeout(() => resolve({ reply: dummyRepliesList.replies[0] }), 500)
    );
  }
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
  try {
    const response = await fetch(`/api/v1/reviews/${reviewId}/replies/${replyId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // TODO: build proper error message
      throw new Error(`Network Error: Failed to fetch update reply: ${response.statusText}`);
    }

    return (await response.json()) as UpdateReplyResponse;
  } catch (error) {
    // TODO: DELETE ME
    return await new Promise((resolve) =>
      setTimeout(() => resolve({ reply: dummyRepliesList.replies[0] }), 500)
    );
  }
}
