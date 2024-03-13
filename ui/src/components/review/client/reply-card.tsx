'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import UserChip from '@/components/auth/client/user-chip';
import ChipButton from '@/components/common/client/chip-button';
import Text from '@/components/common/server/text';
import Time from '@/components/common/server/time';

import { useAuth } from '@/context/auth/auth-context';
import { useToast } from '@/context/common/toast-context';

import { useApiError } from '@/hooks/common/use-api-error';
import { useDropdown } from '@/hooks/common/use-dropdown';

import { deleteReply, updateReply } from '@/lib/apis/review/client';
import { MAX_REPLY_LENGTH } from '@/lib/constants/review';
import type { Reply } from '@/lib/definitions/review';

export function ReplyCard({ reply }: { reply: Reply }) {
  const { user } = useAuth();
  const { content, createdAt, nickname, tag, updatedAt, userId, id: replyId, reviewId } = reply;

  const isUpdated = createdAt !== updatedAt;
  const dateStr = isUpdated ? updatedAt : createdAt;

  const isAuthorized =
    user?.accessLevel === 'ADMIN' || user?.accessLevel === 'DEVELOPER' || user?.id === userId;

  const { isDropdownOpen, targetRef, toggleDropdown } = useDropdown<HTMLDivElement>();

  const [text, setText] = useState(content);
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const charLength = text.length;
  const [disable, setDisable] = useState(false);

  const { handleApiError } = useApiError();
  const { emitToast } = useToast();

  // TODO: disable button to prevent double fetch
  const handleDeleteReply = async () => {
    try {
      await deleteReply(reviewId, replyId);
      emitToast('댓글이 삭제되었습니다.', 'success');
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = () => {
    // TODO: show confirm modal
    void handleDeleteReply();
  };

  const handleUpdateReply = async () => {
    setDisable(true);

    if (charLength === 0) {
      setDisable(false);
      emitToast('내용을 입력해 주세요!', 'error');
      ref.current?.focus();
      return;
    }

    try {
      await updateReply(reviewId, replyId, { content: text });
      emitToast('댓글이 수정되었습니다.', 'success');
      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisable(false);
      setIsEditable(false);
    }
  };

  const handleUpdate = () => {
    void handleUpdateReply();
  };

  return (
    <div className="flex flex-col gap-2 border-t p-6 [&:first-child]:border-none">
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
                  onClick={handleDelete}
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

      {isEditable ? (
        <div className="flex flex-col gap-4">
          <textarea
            ref={ref}
            className="resize-none rounded-lg border p-2 outline-none"
            placeholder="댓글을 입력해 주세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex items-center justify-end space-x-2">
            <Text size="sm" color="gray">{`${charLength} / ${MAX_REPLY_LENGTH}`}</Text>

            <button
              onClick={() => {
                setIsEditable(false);
                setText(content);
              }}
              className={clsx('h-fit w-fit rounded-full border bg-white px-2 py-1', {
                'pointer-events-none': disable,
              })}
              aria-disabled={disable}
            >
              <Text nowrap>취소</Text>
            </button>

            <button
              onClick={handleUpdate}
              className={clsx('h-fit w-fit rounded-full border bg-white px-2 py-1', {
                'pointer-events-none': disable,
              })}
              aria-disabled={disable}
            >
              <Text nowrap>저장</Text>
            </button>
          </div>
        </div>
      ) : (
        <Text size="sm">{content}</Text>
      )}
    </div>
  );
}
