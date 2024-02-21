import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/providers/modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { auth } from './api/auth/auth';
import './globals.css';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('overflow-hidden', inter.className)}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <ModalProvider>
              <NextProgress />
              {children}
              <Toaster richColors />
            </ModalProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
