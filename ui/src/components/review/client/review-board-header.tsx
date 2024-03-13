'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SearchForm from '@/components/common/client/search-form';
import { BoardHeader } from '@/components/common/server/board-header';
import Text from '@/components/common/server/text';

import { REVIEW_FILTERS } from '@/lib/constants/review';

export function ReviewBoardHeader({ SEARCH_OPEN_KEY }: { SEARCH_OPEN_KEY: string }) {
  const [isSearching, setIsSearching] = useState(SEARCH_OPEN_KEY.length > 0);

  useEffect(() => {
    if (SEARCH_OPEN_KEY.length > 0) {
      setIsSearching(true);
    }
  }, [SEARCH_OPEN_KEY]);

  return (
    <BoardHeader>
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <button
            className="h-fit w-fit rounded-full border bg-white px-2 py-1"
            onClick={() => setIsSearching(!isSearching)}
          >
            <Text nowrap>{isSearching ? '검색닫기' : '검색열기'}</Text>
          </button>
          <Link className="h-fit w-fit rounded-full border bg-white px-2 py-1" href="/review/write">
            <Text nowrap>리뷰쓰기</Text>
          </Link>
        </div>
        {isSearching && (
          <div className="pt-4">
            <SearchForm filters={REVIEW_FILTERS} />
          </div>
        )}
      </div>
    </BoardHeader>
  );
}
