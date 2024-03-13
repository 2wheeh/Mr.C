import type { CommentFilter } from '@/lib/definitions/comment';

export const MAX_COMMENT_LENGTH = 500;

export const COMMENT_FILTERS: (keyof CommentFilter)[] = ['movieName', 'nickname'];
