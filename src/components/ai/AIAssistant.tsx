import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { label: 'Product Info', message: 'What products do you export?' },
  { label: 'Get Quote', message: 'How can I request a price quote?' },
  { label: 'Shipping', message: 'What are your shipping options?' },
  { label: 'Contact', message: 'How can I contact the export team?' },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('ai-assistant', {
        body: { messages: [...messages, userMsg] }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const assistantContent = response.data?.content || 'Sorry, I could not process your request.';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error: any) {
      console.error('AI Assistant error:', error);
      
      if (error.message?.includes('429') || error.status === 429) {
        toast({
          variant: 'destructive',
          title: 'Rate limit exceeded',
          description: 'Please wait a moment before sending another message.',
        });
      } else if (error.message?.includes('402') || error.status === 402) {
        toast({
          variant: 'destructive',
          title: 'Service unavailable',
          description: 'AI service credits exhausted. Please try again later.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to get response. Please try again.',
        });
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or contact us directly via WhatsApp.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed right-4 bottom-24 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110',
          'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground',
          isOpen && 'scale-0 opacity-0'
        )}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-7 h-7" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed right-4 bottom-4 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Shiloh Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask about our products & services</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground text-sm">
                Hi! I'm your Shiloh Fresh assistant. How can I help you today?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.message)}
                    className="p-3 text-xs text-left bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] px-4 py-2 rounded-2xl text-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-2 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Or chat via{' '}
            <a
              href="https://wa.me/254702339421"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
