import UserChip from '@/components/auth/client/user-chip';
import Text from '@/components/common/server/text';
import Time from '@/components/common/server/time';
import { ReplyArea } from '@/components/review/client/reply-area';
import ReviewTitle from '@/components/review/client/review-title';
import { ViewerHeader } from '@/components/review/client/viewer-header';
import { ReplyCardsList } from '@/components/review/server/reveiw-reply-cards-list';
import { Viewer } from '@/components/review/server/viewer';

import { EditableProvider } from '@/context/review/editable-context';
import { EditorRefProvider } from '@/context/review/editor-ref-context';
import { ReviewProvider } from '@/context/review/review-context';

import { getReview } from '@/lib/apis/review/server';
import type { ListRepliesQuery } from '@/lib/definitions/review';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Omit<ListRepliesQuery, 'pageOffset' | 'pageSize'> & {
    page?: string;
  };
}) {
  const { review } = await getReview(params.id);
  const query: ListRepliesQuery = {
    direction: 'asc',
    pageOffset: Number(searchParams?.page),
  };

  return (
    <EditorRefProvider>
      <EditableProvider authorId={review.userId}>
        <ReviewProvider prepopulated={{ movieName: review.movieName, title: review.title }}>
          <main className="container mx-auto flex max-w-5xl flex-col items-center">
            <ViewerHeader />

            <section className="w-full p-4">
              <div className="my-2 flex items-center gap-1">
                <Text size="sm" weight="bold">
                  by
                </Text>
                <UserChip nickname={review.nickname} tag={review.tag} />
              </div>

              <Time dateStr={review.createdAt} />

              <div className="flex w-full flex-col gap-4 pt-4">
                <ReviewTitle placeholder="Title" />
                <ReviewTitle isMovieName placeholder="Movie" />
              </div>

              <Viewer content={review.content} />
            </section>

            <section className="w-full border-t p-4">
              <ReplyArea />
            </section>

            <section className="w-full border-t py-6">
              <ReplyCardsList reviewId={Number(params.id)} query={query} />
            </section>
          </main>
        </ReviewProvider>
      </EditableProvider>
    </EditorRefProvider>
  );
}
