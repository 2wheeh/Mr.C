import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// TODO: Lexical needs to export useCharacterLimit
import { useCharacterLimit } from '@lexical/react/shared/useCharacterLimit';
import { useMemo, useState } from 'react';

export function CharacterLimitPlugin({ maxLength }: { maxLength: number }): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);

  const characterLimitProps = useMemo(
    () => ({
      remainingCharacters: setRemainingCharacters,
      strlen: (text: string) => {
        return text.length;
      },
    }),
    []
  );

  useCharacterLimit(editor, maxLength, characterLimitProps);

  return (
    <span
      className={`characters-limit ${remainingCharacters < 0 ? 'characters-limit-exceeded' : ''}`}
    >
      {remainingCharacters}
    </span>
  );
}
