import Pagination from '@/components/common/client/pagination';
import Text from '@/components/common/server/text';
import { ReplyCard } from '@/components/review/client/reply-card';

import { listReplies } from '@/lib/apis/review/server';
import type { ListRepliesQuery } from '@/lib/definitions/review';

export async function ReplyCardsList({
  reviewId,
  query,
}: {
  reviewId: number;
  query: ListRepliesQuery;
}) {
  const { replies, pagination } = await listReplies(reviewId, query);

  return replies.length > 0 ? (
    <div className="relative flex w-full flex-col items-center space-y-4">
      <div className="w-full self-start px-6">
        <Text>{`${pagination.totalEntryCount}개의 댓글`}</Text>
      </div>

      <div className="w-full">
        {replies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}
      </div>

      <div id="replies" className="absolute -top-[108px]" />
      <Pagination totalPages={pagination.totalPageCount} /* scrollToId="replies"*/ />
    </div>
  ) : (
    // TODO: empty comment ui
    <div className="flex w-full px-6">아직 댓글이 없어요...</div>
  );
}
