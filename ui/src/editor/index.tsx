'use client';

import { type InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import type { SerializedEditorState } from 'lexical';

import nodes from '@/editor/nodes';
import { Plugins } from '@/editor/plugins';
import theme from '@/editor/theme';

import '@/styles/editor.css';

// This has to be rendered on client side only (no ssr!)
export default function Editor({
  namespace,
  isNew,
  prepopulated,
}: {
  namespace: string;
  isNew: boolean;
  prepopulated?: SerializedEditorState;
}) {
  const initialConfig: InitialConfigType = {
    editorState: JSON.stringify(prepopulated),
    nodes: [...nodes],
    namespace,
    onError: (error: Error) => {
      throw error;
    },
    theme,
    editable: isNew,
  };

  return (
    <div className="editor">
      <LexicalComposer initialConfig={initialConfig}>
        <Plugins />
      </LexicalComposer>
    </div>
  );
}
