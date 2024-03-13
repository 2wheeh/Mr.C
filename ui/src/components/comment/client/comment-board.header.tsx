'use client';

import { useEffect, useState } from 'react';

import { CommentEditor } from '@/components/comment/client/comment-editor';
import SearchForm from '@/components/common/client/search-form';
import { BoardHeader } from '@/components/common/server/board-header';
import Text from '@/components/common/server/text';

import { COMMENT_FILTERS } from '@/lib/constants/comment';

export function CommentBoardHeader({ SEARCH_OPEN_KEY }: { SEARCH_OPEN_KEY: string }) {
  const [open, setOpen] = useState<null | 'search' | 'write'>(null);

  useEffect(() => {
    if (SEARCH_OPEN_KEY) {
      setOpen('search');
    }
  }, [SEARCH_OPEN_KEY]);

  return (
    <BoardHeader>
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <button
            className="h-fit w-fit rounded-full border bg-white px-2 py-1"
            onClick={() => setOpen((prev) => (prev === 'search' ? null : 'search'))}
          >
            <Text nowrap>{open === 'search' ? '검색닫기' : '검색열기'}</Text>
          </button>

          <button
            className="h-fit w-fit rounded-full border bg-white px-2 py-1"
            onClick={() => setOpen((prev) => (prev === 'write' ? null : 'write'))}
          >
            <Text nowrap>{open === 'write' ? '취소' : '새코멘트'}</Text>
          </button>
        </div>

        <div className="pt-4">
          {open === 'search' && <SearchForm filters={COMMENT_FILTERS} />}

          {open === 'write' && <CommentEditor onSubmit={() => setOpen(null)} />}
        </div>
      </div>
    </BoardHeader>
  );
}
