import { useEditorHistoryContext } from '@/context/editor/editor-history-context';
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

export function HistoryPlugin() {
  const { historyState } = useEditorHistoryContext();
  return <LexicalHistoryPlugin externalHistoryState={historyState} />;
}
