import { ChangeEventHandler, forwardRef, useImperativeHandle, useRef } from 'react';

interface CommentAreatProps {
  content: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export interface CommtenAreaRef {
  focus: () => void;
}

export default forwardRef<CommtenAreaRef, CommentAreatProps>(function CommentAreat(
  { content, onChange }: CommentAreatProps,
  forwardedRef
) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(forwardedRef, () => ({ focus: () => ref.current?.focus() }));

  return (
    <textarea
      ref={ref}
      className="resize-none rounded-lg border p-2 outline-none"
      placeholder="코멘트를 입력해 주세요..."
      value={content}
      onChange={onChange}
    />
  );
});
