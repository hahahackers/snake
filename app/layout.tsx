import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}>
        <nav>
          <ul className="flex gap-4 uppercaseh">
            <li>
              <a href="snake">Snake</a>
            </li>
            <li>
              <a href="plainsnake">Also Snake</a>
            </li>
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
