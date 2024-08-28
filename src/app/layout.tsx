'use client';

import { Suspense } from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Flip, ToastContainer } from 'react-toastify';

import { ModalProvider, QueryProvider } from '@/providers';

import '@/assets/styles/index.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'San Luis - Calamity Assistance',
//   description: '',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#02583f" showSpinner={false} />
        <QueryProvider>
          <ModalProvider>
            <Suspense>{children}</Suspense>
            <ToastContainer hideProgressBar transition={Flip} />
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
