'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import UserChip from '@/components/auth/client/user-chip';
import CommentArea from '@/components/comment/client/comment-area';
import ChipButton from '@/components/common/client/chip-button';
import Text from '@/components/common/server/text';
import Time from '@/components/common/server/time';

import { useAuth } from '@/context/auth/auth-context';

import { useCommentArea } from '@/hooks/comment/use-comment-area';
import { useApiError } from '@/hooks/common/use-api-error';
import { useDropdown } from '@/hooks/common/use-dropdown';

import { deleteComment, updateComment } from '@/lib/apis/comment/client';
import { MAX_COMMENT_LENGTH } from '@/lib/constants/comment';
import type { Comment } from '@/lib/definitions/comment';

export function CommentCard({ comment }: { comment: Comment }) {
  const {
    content: prepopulatedContent,
    nickname,
    tag,
    createdAt,
    updatedAt,
    userId,
    movieName,
    id: commentId,
  } = comment;

  const isUpdated = createdAt !== updatedAt;
  const dateStr = isUpdated ? updatedAt : createdAt;

  const { user } = useAuth();
  const isAuthorized = user?.accessLevel === 'ADMIN' || user?.id === userId;

  const [movieNameText, setMovieNameText] = useState(movieName);

  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  const [disable, setDisable] = useState(false);

  const { isDropdownOpen, targetRef, toggleDropdown } = useDropdown<HTMLDivElement>();

  const { ref, content, onCommentChange } = useCommentArea(prepopulatedContent);
  const charLength = content.length;

  const { handleApiError } = useApiError();

  const handleDeleteComment = async () => {
    setDisable(true);

    try {
      await deleteComment(commentId);

      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisable(false);
    }
  };

  const handleClickDelete = () => {
    void handleDeleteComment();
  };

  const handleUpdateComment = async () => {
    setDisable(true);

    // TODO: check movieTitle is empty
    if (charLength === 0) {
      setDisable(false);
      ref.current?.focus();
      return;
    }

    try {
      await updateComment(commentId, { content, movieName: movieNameText });

      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisable(false);
      setIsEditable(false);
    }
  };

  const handleClickUpdate = () => {
    void handleUpdateComment();
  };

  return (
    <div className="flex flex-col gap-2 border-t p-6 [&:first-child]:border-none">
      {/* TODO: this has to be adjustable size */}
      {/* <div
        className={clsx({ 'cursor-pointer': !isEditable })}
        onClick={() => !isEditable && router.push(`/comment?movieName=${movieName}`)}
      > */}
      <textarea
        value={movieNameText}
        onChange={(e) => setMovieNameText(e.target.value)}
        className={clsx('h-8 w-full resize-none text-lg font-bold outline-none', {
          // 'pointer-events-none': !isEditable,
        })}
        readOnly={!isEditable}
        placeholder="영화제목을 입력해 주세요..."
      />
      {/* </div> */}

      {isEditable ? (
        <div className="flex flex-col gap-4">
          <CommentArea content={content} ref={ref} onChange={onCommentChange} />

          <div className="flex items-center justify-end space-x-2">
            <Text size="sm" color="gray">{`${charLength} / ${MAX_COMMENT_LENGTH}`}</Text>

            <button
              onClick={() => {
                setIsEditable(false);
                // setText(prepopulatedContent);
                // TOOD: reset movieNameText
                setMovieNameText(movieName);
              }}
              className={clsx('h-fit w-fit rounded-full border bg-white px-2 py-1', {
                'pointer-events-none': disable,
              })}
              aria-disabled={disable}
            >
              <Text nowrap>취소</Text>
            </button>

            <button
              onClick={handleClickUpdate}
              className={clsx('h-fit w-fit rounded-full border bg-white px-2 py-1', {
                'pointer-events-none': disable,
              })}
              aria-disabled={disable}
            >
              <Text>저장</Text>
            </button>
          </div>
        </div>
      ) : (
        <Text>{content}</Text>
      )}

      <div className="flex flex-wrap items-center gap-1">
        <UserChip nickname={nickname} tag={tag} />

        <Text weight="bold">&#183;</Text>

        <Time dateStr={dateStr} relative nowrap />
        {isUpdated && (
          <div className="hidden min-[350px]:block">
            <Text nowrap>수정됨</Text>
          </div>
        )}

        {isAuthorized && (
          <div ref={targetRef} className="relative ml-auto">
            <ChipButton
              rounded="lg"
              width="fit"
              Icon={<EllipsisVerticalIcon className="w-4" />}
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 top-7 flex flex-col rounded-lg border bg-white p-2">
                <ChipButton
                  onClick={handleClickDelete}
                  Text={
                    <Text size="sm" nowrap>
                      삭제
                    </Text>
                  }
                  rounded="lg"
                  width="full"
                />

                <ChipButton
                  onClick={() => setIsEditable(true)}
                  Text={
                    <Text size="sm" nowrap>
                      수정
                    </Text>
                  }
                  rounded="lg"
                  width="full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
