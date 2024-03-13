import { Suspense } from 'react';

import { CommentBoardHeader } from '@/components/comment/client/comment-board.header';
import { CommentCardsList } from '@/components/comment/server/comment-cards-list';

import { COMMENT_FILTERS } from '@/lib/constants/comment';
import { ListCommentsQuery } from '@/lib/definitions/comment';

export default function Page({
  searchParams,
}: {
  searchParams?: Omit<ListCommentsQuery, 'pageOffset' | 'pageSize'> & {
    page?: string;
  };
}) {
  const query: ListCommentsQuery = {
    movieName: searchParams?.movieName,
    nickname: searchParams?.nickname,
    pageOffset: Number(searchParams?.page),
  };

  const SEARCH_OPEN_KEY = COMMENT_FILTERS.reduce((acc, filter) => acc + (query[filter] ?? ''), '');

  return (
    <main className="container mx-auto flex max-w-5xl flex-col items-center">
      <CommentBoardHeader SEARCH_OPEN_KEY={SEARCH_OPEN_KEY} />

      <section className="w-full py-4">
        <Suspense
          key={JSON.stringify(query)} /*fallback={<CommentCardsListSkeleton />} */
          fallback={<div>loading</div>}
        >
          <CommentCardsList query={query} />
        </Suspense>
      </section>
    </main>
  );
}
