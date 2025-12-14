import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AccessibilityToggle } from '@/components/accessibility/AccessibilityToggle';
import { AIAssistant } from '@/components/ai/AIAssistant';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Floating toggles - stacked in bottom right */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <AccessibilityToggle />
        <AIAssistant />
      </div>
    </div>
  );
}
