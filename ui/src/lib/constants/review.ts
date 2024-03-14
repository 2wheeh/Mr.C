import { ReviewFilter } from '@/lib/definitions/review';

export const MAX_TITLE_LENGTH = 100;
export const MAX_CONTENT_LENGTH = 5000;

export const REVIEW_FILTERS: (keyof ReviewFilter)[] = ['title', 'nickname', 'movieName'];

export const MAX_REPLY_LENGTH = 500;
