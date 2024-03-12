'use client';

import clsx from 'clsx';

import Text from '@/components/common/server/text';

import { useCreateReviewButton } from '@/hooks/review/use-create-review-button';

export function CreateReviewButton() {
  const { disabled, handleClick } = useCreateReviewButton();

  return (
    <button
      role="button"
      className={clsx('rounded-full border bg-white px-2 py-1', {
        'pointer-events-none': disabled,
      })}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      <Text>등록하기</Text>
    </button>
  );
}
