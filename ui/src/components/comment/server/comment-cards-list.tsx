import { CommentCard } from '@/components/comment/client/comment-card';
import Pagination from '@/components/common/client/pagination';

import { listComments } from '@/lib/apis/comment/server';
import type { ListCommentsQuery } from '@/lib/definitions/comment';

export async function CommentCardsList({ query }: { query: ListCommentsQuery }) {
  const { comments, pagination } = await listComments(query);

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      {pagination.totalPageCount > 0 ? (
        <>
          <div className="w-full">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          <Pagination totalPages={pagination.totalPageCount} />
        </>
      ) : (
        <div>empty</div>
      )}
    </div>
  );
}
