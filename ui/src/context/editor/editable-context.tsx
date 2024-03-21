'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useEditorRef } from '@/context/editor/editor-ref-context';

interface ContextShape {
  isEditable: boolean;
  authorId: string;
  setIsEditable?: (isEditable: boolean) => void;
}

const EditableContext = createContext<ContextShape | null>(null);

export function EditableProvider({
  children,
  authorId,
}: {
  children: ReactNode;
  authorId: string;
}) {
  const { editorRef } = useEditorRef() ?? {};

  if (!editorRef) {
    throw new Error('EditableProvider must be used within a EditorProvider');
  }

  const editor = editorRef.current;

  const [isEditable, _setIsEditable] = useState(() => (editor ? editor.isEditable() : false));

  useEffect(
    () =>
      editor?.registerEditableListener((editable) => {
        _setIsEditable(editable);
      }),
    [editor]
  );

  const setIsEditable = (isEditable: boolean) => editor?.setEditable(isEditable);

  return (
    <EditableContext.Provider value={{ isEditable, authorId, setIsEditable }}>
      {children}
    </EditableContext.Provider>
  );
}

export function useEditable() {
  return useContext(EditableContext);
}
