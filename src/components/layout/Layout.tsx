import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIAssistant } from '@/components/ai/AIAssistant';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-50 sm:right-4">
        <AIAssistant />
      </div>
    </div>
  );
}
