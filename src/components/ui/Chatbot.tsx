import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, Sparkles } from 'lucide-react';

interface Msg { from: 'bot' | 'user'; text: string; }

const CANNED: Record<string, string> = {
  pricing: 'Projects start around $8k for websites and scale with complexity. Want a tailored quote? Drop your email in the contact form and we\'ll be in touch within a day.',
  services: 'We build websites, web & mobile apps, custom software (CRM/ERP/HRMS), plus cloud, AI and growth. Which area are you exploring?',
  time: 'Most sites ship in 4–6 weeks; complex apps in 3–5 months. We\'ll give you an exact timeline after a quick discovery call.',
  hello: 'Hi there! 👋 I\'m Wyn, the Wynex assistant. Ask me about our services, pricing or process — or say "contact" to reach a human.',
  contact: 'You can reach our team at wynextechnologiespatna@gmail.com, or scroll to the contact section and send us a message. We reply fast!',
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/(price|cost|budget|quote)/.test(q)) return CANNED.pricing;
  if (/(service|build|develop|do you)/.test(q)) return CANNED.services;
  if (/(time|long|deadline|when)/.test(q)) return CANNED.time;
  if (/(contact|email|call|human|talk)/.test(q)) return CANNED.contact;
  if (/(hi|hello|hey|start)/.test(q)) return CANNED.hello;
  return 'Great question! For specifics like that, the fastest path is our team at wynextechnologiespatna@gmail.com. Meanwhile, I can help with services, pricing or timelines.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: CANNED.hello }]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: 'user', text }]);
    setInput('');
    setTimeout(() => setMsgs((m) => [...m, { from: 'bot', text: reply(text) }]), 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        className="fixed bottom-24 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white shadow-glow transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquareText className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-44 right-6 z-[60] flex h-[26rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-[#0d1424]/95"
          >
            <div className="flex items-center gap-3 border-b border-ink/5 bg-brand-gradient px-5 py-4 text-white">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Wyn · AI Assistant</p>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <p className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'rounded-br-sm bg-ink text-white dark:bg-brand-indigo' : 'rounded-bl-sm bg-surface-off text-ink dark:bg-white/10 dark:text-slate-100'}`}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-ink/5 p-3 dark:border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, pricing…"
                aria-label="Chat message"
                className="flex-1 rounded-full bg-surface-off px-4 py-2.5 text-sm text-ink outline-none ring-brand-indigo/40 focus:ring-2 dark:bg-white/5 dark:text-white"
              />
              <button type="submit" aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-white">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
