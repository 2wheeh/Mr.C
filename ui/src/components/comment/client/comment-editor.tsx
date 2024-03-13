'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CommentArea from '@/components/comment/client/comment-area';
import Text from '@/components/common/server/text';

import { useAuth } from '@/context/auth/auth-context';
import { useToast } from '@/context/common/toast-context';

import { useCommentArea } from '@/hooks/comment/use-comment-area';
import { useApiError } from '@/hooks/common/use-api-error';

import { createComment } from '@/lib/apis/comment/client';
import { MAX_COMMENT_LENGTH } from '@/lib/constants/comment';
import { normalizeWhitespace } from '@/lib/utils/common/normalizeWhitespace';

export function CommentEditor({ onSubmit }: { onSubmit?: () => void }) {
  const { user, signIn } = useAuth();

  const [movieName, setMovieName] = useState('');

  const [disable, setDisable] = useState(false);

  const router = useRouter();

  const { content, onCommentChange, ref } = useCommentArea();

  const charLength = content.length;

  const { emitToast } = useToast();
  const { handleApiError } = useApiError();

  const handleCreateComment = async () => {
    setDisable(true);

    // TODO: check movieTitle is empty
    if (charLength === 0) {
      setDisable(false);
      emitToast('내용을 입력해 주세요!', 'error');
      ref.current?.focus();
      return;
    }

    try {
      await createComment({ content, movieName });

      router.push('/comment');
      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisable(false);
      onSubmit && onSubmit();
    }
  };

  const handleSubmit = () => {
    void handleCreateComment();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        className="w-full outline-none"
        placeholder="영화제목을 입력해 주세요..."
        value={movieName}
        onChange={(e) => setMovieName(normalizeWhitespace(e.target.value))}
      />

      {user ? (
        <>
          <CommentArea ref={ref} content={content} onChange={onCommentChange} />

          <div className="flex items-center justify-end space-x-2">
            <Text size="sm" color="gray">{`${charLength} / ${MAX_COMMENT_LENGTH}`}</Text>

            <button
              onClick={handleSubmit}
              className={clsx('h-fit w-fit rounded-full border bg-white px-2 py-1', {
                'pointer-events-none': disable,
              })}
              aria-disabled={disable}
            >
              <Text nowrap>등록하기</Text>
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            className="flex h-[66px] w-full rounded-lg border p-2 outline-none"
            onClick={() => signIn()}
          >
            <Text color="gray">코멘트 작성을 위해 로그인을 해주세요...</Text>
          </button>

          <div className="ml-auto h-fit w-fit rounded-full border bg-white px-2 py-1">
            <Text color="gray" nowrap>
              등록하기
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
