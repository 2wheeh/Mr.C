import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { OverflowNode } from '@lexical/overflow';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';

const mrcNodes: (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  OverflowNode,
];

export default mrcNodes;
