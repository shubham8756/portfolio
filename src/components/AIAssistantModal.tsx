import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, User, RefreshCw, Wand2, Check } from 'lucide-react';
import { PortfolioProfile } from '../types';

interface AIAssistantModalProps {
  profile: PortfolioProfile;
  onClose: () => void;
  onApplyBio?: (newBio: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  profile,
  onClose,
  onApplyBio,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'polish'>('chat');
  
  // Chat state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hello! I'm ${profile.name}'s AI Career Assistant. Ask me anything about their technical stack, projects, work experience, or availability!`,
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // AI Polish state
  const [bioInput, setBioInput] = useState(profile.bio);
  const [polishedBio, setPolishedBio] = useState('');
  const [isPolishLoading, setIsPolishLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');

    const newHistory = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newHistory);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          profileData: profile,
          history: messages,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([
          ...newHistory,
          {
            role: 'assistant',
            content: data.error || 'Sorry, I could not generate a response right now. Ensure GEMINI_API_KEY is configured.',
          },
        ]);
      }
    } catch (err: any) {
      setMessages([
        ...newHistory,
        { role: 'assistant', content: 'Network error communicating with AI server.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handlePolishBio = async () => {
    if (!bioInput.trim() || isPolishLoading) return;
    setIsPolishLoading(true);

    try {
      const res = await fetch('/api/ai-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: bioInput, type: 'bio' }),
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setPolishedBio(data.text);
      } else {
        alert(data.error || 'Failed to polish bio.');
      }
    } catch (err) {
      alert('Error calling AI polish API.');
    } finally {
      setIsPolishLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[620px] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Portfolio AI Assistant
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Powered by Gemini 2.5 Flash
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Ask Recruiter AI
          </button>
          <button
            onClick={() => setActiveTab('polish')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'polish'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            AI Bio Copywriter
          </button>
        </div>

        {/* Tab 1: Recruiter Chat */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-indigo-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800 w-fit">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  AI is crafting answer...
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-slate-500 shrink-0 font-mono">Suggested:</span>
              <button
                onClick={() => setInputMessage(`What are ${profile.name}'s top skills?`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap"
              >
                Top Skills?
              </button>
              <button
                onClick={() => setInputMessage(`Is ${profile.name} available for hire?`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap"
              >
                Availability?
              </button>
              <button
                onClick={() => setInputMessage(`Tell me about ${profile.name}'s best AI or Full-Stack project.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap"
              >
                Best Project?
              </button>
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about my skills, experience, projects or hiring..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isChatLoading}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          /* Tab 2: AI Bio Polish Tool */
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Profile Bio</label>
              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white resize-none"
              ></textarea>
            </div>

            <button
              onClick={handlePolishBio}
              disabled={isPolishLoading}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              {isPolishLoading ? 'Polishing Copy with Gemini AI...' : 'Polish Bio with AI'}
            </button>

            {polishedBio && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Enhanced Result
                  </span>
                  {onApplyBio && (
                    <button
                      onClick={() => {
                        onApplyBio(polishedBio);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Apply to Profile
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{polishedBio}"
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
