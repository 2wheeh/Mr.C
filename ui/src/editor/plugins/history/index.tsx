import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { useEditorHistoryContext } from '@/editor/plugins/history/editor-history-context';

export function HistoryPlugin() {
  const { historyState } = useEditorHistoryContext();
  return <LexicalHistoryPlugin externalHistoryState={historyState} />;
}
