import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { RangeSelection } from 'lexical';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  ElementNode,
  INDENT_CONTENT_COMMAND,
} from 'lexical';
import { useEffect } from 'react';

type Props = Readonly<{
  maxDepth: number | null | undefined;
}>;

function getElementNodesInSelection(selection: RangeSelection): Set<ElementNode> {
  const nodesInSelection = selection.getNodes();
  // TODO: Remove this type assertion once the lexical types are updated. facebook#5710
  const anchor = selection.anchor.getNode() as ElementNode;
  const focus = selection.focus.getNode() as ElementNode;

  if (nodesInSelection.length === 0) {
    return new Set<ElementNode>([anchor.getParentOrThrow(), focus.getParentOrThrow()]);
  }

  return new Set(nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())));
}

function isIndentPermitted(maxDepth: number): boolean {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return false;
  }

  const elementNodesInSelection: Set<ElementNode> = getElementNodesInSelection(selection);

  let totalDepth = 0;

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      // TODO: Remove this type assertion once the lexical types are updated.
      const parent = elementNode.getParent() as ElementNode;

      if (!$isListNode(parent)) {
        throw new Error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.'
        );
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }

  return totalDepth <= maxDepth;
}

export default function ListMaxIndentLevelPlugin({ maxDepth }: Props): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, maxDepth]);
  return null;
}
