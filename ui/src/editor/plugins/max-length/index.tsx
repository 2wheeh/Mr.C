// ref: https://github.com/facebook/lexical/tree/main/packages/lexical-playground/src/plugins/MaxLengthPlugin
import { $getSelection, $isRangeSelection, EditorState, RootNode } from 'lexical';
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { trimTextContentFromAnchor } from '@lexical/selection';
import { $restoreEditorState } from '@lexical/utils';

import { useToast } from '@/context/common/toast-context';

import { useDebouncedCallback } from '@/hooks/common/use-debounced-callback';

export function MaxLengthPlugin({ maxLength }: { maxLength: number }): null {
  const [editor] = useLexicalComposerContext();

  const { emitToast } = useToast();
  const debouncedEmitToast = useDebouncedCallback(emitToast, 300);

  useEffect(() => {
    let lastRestoredEditorState: EditorState | null = null;

    return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return;
      }

      const prevEditorState = editor.getEditorState();
      const prevTextContentSize = prevEditorState.read(() => rootNode.getTextContentSize());
      const textContentSize = rootNode.getTextContentSize();

      if (prevTextContentSize !== textContentSize) {
        const delCount = textContentSize - maxLength;
        const anchor = selection.anchor;

        if (delCount > 0) {
          // TODO: pass this as onMaxLength prop
          debouncedEmitToast(`리뷰는 ${maxLength}자를 넘을 수 없습니다.`, 'error');

          // Restore the old editor state instead if the last
          // text content was already at the limit.
          if (prevTextContentSize === maxLength && lastRestoredEditorState !== prevEditorState) {
            lastRestoredEditorState = prevEditorState;
            $restoreEditorState(editor, prevEditorState);
          } else {
            trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength, debouncedEmitToast]);

  return null;
}
