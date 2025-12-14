import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppBubble } from './WhatsAppBubble';
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
      <WhatsAppBubble />
      <AccessibilityToggle />
      <AIAssistant />
    </div>
  );
}
