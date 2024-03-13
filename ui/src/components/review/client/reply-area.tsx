'use client';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import Text from '@/components/common/server/text';

import { useAuth } from '@/context/auth/auth-context';
import { useToast } from '@/context/common/toast-context';

import { useApiError } from '@/hooks/common/use-api-error';
import { useDebouncedCallback } from '@/hooks/common/use-debounced-callback';

import { createReply } from '@/lib/apis/review/client';
import { MAX_REPLY_LENGTH } from '@/lib/constants/review';

export function ReplyArea() {
  const { user, signIn } = useAuth();
  const [reply, setReply] = useState('');
  const { id } = useParams();
  const [disable, setDisable] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const { emitToast } = useToast();
  const { handleApiError } = useApiError();

  const charLength = reply.length;

  const handleCreateReply = async () => {
    setDisable(true);

    if (charLength === 0) {
      setDisable(false);
      emitToast('내용을 입력해 주세요!', 'error');
      ref.current?.focus();
      return;
    }

    try {
      await createReply(Number(id), { content: reply });
      emitToast('댓글이 등록되었습니다.', 'success');
      router.refresh(); // TODO: router.push(...#new reply id), check 댓글 표시 순서
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisable(false);
    }
  };

  const handleSubmit = () => {
    void handleCreateReply();
  };

  const debouncedEmitToast = useDebouncedCallback(emitToast, 500);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;
    if (newText.length > MAX_REPLY_LENGTH) {
      newText = newText.slice(0, MAX_REPLY_LENGTH);
      debouncedEmitToast(`댓글은 ${MAX_REPLY_LENGTH}자 이내로 입력해 주세요!`, 'error');
    }
    setReply(newText);
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="new-reply" className="w-fit">
        <Text>댓글 추가</Text>
      </label>

      {user ? (
        <>
          <textarea
            ref={ref}
            id="new-reply"
            className="resize-none rounded-lg border p-2 outline-none"
            placeholder="댓글을 입력해 주세요..."
            value={reply}
            onChange={handleChange}
          />

          <div className="flex items-center justify-end space-x-2">
            <Text size="sm" color="gray">{`${charLength} / ${MAX_REPLY_LENGTH}`}</Text>

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
            <Text color="gray">댓글 입력을 위해 로그인을 해주세요...</Text>
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
