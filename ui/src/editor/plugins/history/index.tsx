import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { useEditorHistoryContext } from '@/context/editor/editor-history-context';

export function HistoryPlugin() {
  const { historyState } = useEditorHistoryContext();
  return <LexicalHistoryPlugin externalHistoryState={historyState} />;
}
