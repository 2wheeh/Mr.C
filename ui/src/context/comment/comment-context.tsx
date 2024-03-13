'use client';

import { type ReactNode, createContext, useContext } from 'react';

interface ContextShape {}

const CommentCotext = createContext<ContextShape | null>(null);

export function CommentProvider({
  children,
  // prepopulated,
}: {
  children: ReactNode;
  prepopulated?: {
    title: string;
    movieName: string;
  };
}) {
  return <CommentCotext.Provider value={{}}>{children}</CommentCotext.Provider>;
}

export function useComment() {
  const context = useContext(CommentCotext);
  if (!context) {
    throw new Error('useComment must be used within an CommentProvider');
  }

  return context;
}
