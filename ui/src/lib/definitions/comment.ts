import type { Pagination } from '@/lib/definitions/common';

export interface Comment {
  id: number; //123,
  userId: string; //"{UUID v4}",
  nickname: string; // "신비로운 평론가 붉은 여우",
  tag: string; //"#MQ3B",
  movieName: string; //"Mad Max",
  content: string; // "{comment_content}",
  createdAt: string; //"2023-04-02T15:08:00+09:00",
  updatedAt: string; //"2023-04-02T15:08:00+09:00"
}

export interface CommentFilter {
  nickname?: string;
  movieName?: string;
}

export interface ListCommentsResponse {
  comments: Comment[];
  pagination: Pagination;
  filter?: CommentFilter;
}

export interface ListCommentsQuery
  extends CommentFilter,
    Partial<Omit<Pagination, 'totalPageCount' | 'totalEntryCount'>> {}

export interface CreateCommentRequest {
  movieName: string;
  content: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export interface UpdateCommentRequest {
  movieName: string;
  content: string;
}

export interface UpdateCommentResponse {
  comment: Comment;
}
