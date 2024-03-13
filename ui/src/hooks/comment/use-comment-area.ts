'use client';

import { useRef, useState } from 'react';

import { useToast } from '@/context/common/toast-context';

import { useDebouncedCallback } from '@/hooks/common/use-debounced-callback';

import { MAX_COMMENT_LENGTH } from '@/lib/constants/comment';
import { normalizeWhitespace } from '@/lib/utils/common/normalizeWhitespace';

export function useCommentArea(prepopulatedContent?: string) {
  const [content, setContent] = useState(prepopulatedContent ?? '');
  const ref = useRef<HTMLTextAreaElement>(null);

  const { emitToast } = useToast();
  const debouncedEmitToast = useDebouncedCallback(emitToast, 500);

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newCommnet = normalizeWhitespace(e.target.value);

    if (newCommnet.length > MAX_COMMENT_LENGTH) {
      newCommnet = newCommnet.slice(0, MAX_COMMENT_LENGTH);

      debouncedEmitToast(`코멘트는 ${MAX_COMMENT_LENGTH}자 이하로 입력해 주세요!`, 'error');
    }

    setContent(newCommnet);
  };

  return { content, ref, onCommentChange };
}
