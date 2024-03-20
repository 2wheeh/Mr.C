import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import { useEditorRef } from '@/context/editor/editor-ref-context';

import { HistoryPlugin } from '@/editor/plugins/history';
import { MarkdownShortcutPlugin } from '@/editor/plugins/markdown-shorcut';
import { MaxLengthPlugin } from '@/editor/plugins/max-length';

function Placeholder() {
  return <div className="placeholder">Begin writing your review...</div>;
}

export function Plugins({ maxLength }: { maxLength?: number }) {
  const { onRef } = useEditorRef() ?? {};

  return (
    <>
      <RichTextPlugin
        contentEditable={
          <div className="content-editable-wrapper">
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
      <HistoryPlugin />
      <TabIndentationPlugin />
      {onRef !== undefined && <EditorRefPlugin editorRef={onRef} />}
      {maxLength && <MaxLengthPlugin maxLength={maxLength} />}
    </>
  );
}
