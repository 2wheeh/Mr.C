'use client';

import clsx from 'clsx';

import Text from '@/components/common/server/text';

import { useUpdateReivewButton } from '@/hooks/review/use-update-review-button';

export function UpdateReviewButton() {
  const { disabled, handleClick } = useUpdateReivewButton();

  const className = clsx('rounded-full border bg-white px-2 py-1', {
    'pointer-events-none': disabled,
  });

  return (
    <button className={className} aria-disabled={disabled} onClick={handleClick}>
      <Text>저장하기</Text>
    </button>
  );
}
