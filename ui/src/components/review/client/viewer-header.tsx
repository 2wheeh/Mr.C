'use client';

import Link from 'next/link';

import { BoardHeader } from '@/components/common/server/board-header';
import Text from '@/components/common/server/text';
import { UpdateReviewButton } from '@/components/review/client/update-review-button';

import { useViewerHeader } from '@/hooks/review/use-viewer-header';

export function ViewerHeader() {
  const { isEditable, isAuthorized, handleClickCancel, handleClickEdit } = useViewerHeader();

  return (
    <BoardHeader>
      {isEditable ? (
        <button onClick={handleClickCancel} className="rounded-full border bg-white px-2 py-1">
          수정취소
        </button>
      ) : (
        <Link href="/review" className="rounded-full border bg-white px-2 py-1">
          <Text>목록으로</Text>
        </Link>
      )}

      {isAuthorized &&
        (isEditable ? (
          <UpdateReviewButton />
        ) : (
          <button onClick={handleClickEdit} className="rounded-full border bg-white px-2 py-1">
            수정하기
          </button>
        ))}
    </BoardHeader>
  );
}
