import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import UserChip from '@/components/auth/client/user-chip';
import Text from '@/components/common/server/text';
import Time from '@/components/common/server/time';

import type { Review } from '@/lib/definitions/review';
import { parseReviewContent } from '@/lib/utils/review/parse-review-content';

export function ReviewCard({ review }: { review: Review }) {
  const { content, createdAt, movieName, nickname, tag, updatedAt, title, replyCount } = review;

  const { description } = parseReviewContent(content);

  const isUpdated = createdAt !== updatedAt;
  const dateStr = isUpdated ? updatedAt : createdAt;

  return (
    <div className="flex flex-col border-t p-6 [&:first-child]:border-none">
      <Link href={`/review/${review.id}`} className="w-fit">
        <Text size="xl" weight="bold">
          {title}
        </Text>
      </Link>

      <Text weight="medium">{movieName}</Text>

      <Link href={`/review/${review.id}`} className="mt-4">
        <Text lineClamp={3}>{description}</Text>
      </Link>

      <div className="mt-3 flex items-center gap-1">
        {/* TODO: this has to be Link with scrollIntoView reply */}
        <ChatBubbleOvalLeftIcon className="w-4" />
        <Text size="sm">{`${replyCount}`}</Text>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1">
        <UserChip nickname={nickname} tag={tag} />

        <Text weight="bold">&#183;</Text>

        <Time dateStr={dateStr} relative nowrap />
        {isUpdated && (
          <div className="hidden min-[350px]:block">
            <Text nowrap>수정됨</Text>
          </div>
        )}
      </div>
    </div>
  );
}
