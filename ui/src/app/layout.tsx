import { Metadata } from 'next';

import { AuthProvider } from '@/context/auth/auth-context';
import { ToastProvider } from '@/context/common/toast-context';

import { notoSansKr } from '@/styles/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
