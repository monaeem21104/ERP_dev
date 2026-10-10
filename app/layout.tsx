// app/layout.tsx
import './globals.css'; // <-- THIS IS THE MAGIC LINE YOU ARE MISSING
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modern ERP',
  description: 'Enterprise Solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}