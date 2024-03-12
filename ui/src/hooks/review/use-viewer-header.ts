'use client';

import type { EditorState } from 'lexical';
import { useState } from 'react';

import { useAuth } from '@/context/auth/auth-context';
import { useEditable } from '@/context/review/editable-context';
import { useEditorRef } from '@/context/review/editor-ref-context';
import { useReview } from '@/context/review/review-context';

export function useViewerHeader() {
  const { user } = useAuth();
  const { isEditable, authorId, setIsEditable } = useEditable() ?? {};

  const isAuthorized =
    user?.accessLevel === 'ADMIN' || user?.accessLevel === 'DEVELOPER' || user?.id === authorId;

  const [savedState, setSavedState] = useState<{
    title: string;
    movieName: string;
    editorState: EditorState;
  }>();

  const { setMovieName, setTitle, title, movieName } = useReview();

  const { editorRef } = useEditorRef() ?? {};
  const editor = editorRef?.current;

  const handleClickCancel = () => {
    if (savedState && editor && setIsEditable) {
      setMovieName(savedState.movieName);
      setTitle(savedState.title);
      editor.setEditorState(savedState.editorState);

      setIsEditable(false);
    }
  };

  const handleClickEdit = () => {
    if (editor && setIsEditable) {
      setSavedState({ title, movieName, editorState: editor.getEditorState() });

      setIsEditable(true);
    }
  };

  return { handleClickCancel, handleClickEdit, isAuthorized, isEditable };
}
