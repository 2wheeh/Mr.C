'use client';

import Link from 'next/link';
import { useState } from 'react';

import SearchForm from '@/components/common/client/search-form';
import { BoardHeader } from '@/components/common/server/board-header';
import Text from '@/components/common/server/text';

export function ReviewBoardHeader() {
  const [isSearching, setIsSearching] = useState(false); // TODO: initialize to true when query is set

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
            <SearchForm filters={['title', 'nickname', 'movieName']} />
          </div>
        )}
      </div>
    </BoardHeader>
  );
}
