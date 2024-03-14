'use client';

import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import clsx from 'clsx';
import { useState } from 'react';

import { useEditorRef } from '@/context/review/editor-ref-context';

import ComponentPickerMenuPlugin from '@/editor/plugins/component-picker-menu';
import { EditorRefPlugin } from '@/editor/plugins/editor-ref';
import { ToolbarPlugin } from '@/editor/plugins/floating-toolbar';
import { HistoryPlugin } from '@/editor/plugins/history';
import ListMaxIndentLevelPlugin from '@/editor/plugins/list-max-indent-level';
import { MarkdownShortcutPlugin } from '@/editor/plugins/markdown-shorcut';

const useAnchor = (): [HTMLDivElement | null, (divElem: HTMLDivElement) => void] => {
  const [anchorElem, setAnchorElem] = useState<HTMLDivElement | null>(null);
  const onAnchorRef = (_anchorElem: HTMLDivElement) => {
    if (_anchorElem !== null) {
      setAnchorElem(_anchorElem);
    }
  };

  return [anchorElem, onAnchorRef];
};

function Placeholder() {
  return <div className="placeholder">Begin writing your review...</div>;
}

// TODO: save the value of maxLength

export function Plugins({ maxLength }: { maxLength?: number }) {
  const { onRef } = useEditorRef() ?? {};
  const [editor] = useLexicalComposerContext();
  const isEditable = editor.isEditable();
  const [anchorElem, onAnchorRef] = useAnchor();

  return (
    <>
      <RichTextPlugin
        contentEditable={
          <div className="content-editable-wrapper" ref={onAnchorRef}>
            <div className="content-editable">
              <ContentEditable data-testid="content-editable" />
            </div>
          </div>
        }
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin />
      <ListPlugin />
      <TabIndentationPlugin />
      <ListMaxIndentLevelPlugin maxDepth={3} />
      <HistoryPlugin />
      <div className={clsx({ hidden: !isEditable })}>
        <ComponentPickerMenuPlugin />
        {maxLength && <CharacterLimitPlugin charset="UTF-16" maxLength={maxLength} />}
        {anchorElem && <ToolbarPlugin anchorElem={anchorElem} />}
      </div>
      {onRef !== undefined && <EditorRefPlugin editorRef={onRef} />}
    </>
  );
}
