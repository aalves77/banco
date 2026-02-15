
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { Transaction } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AIAssistantProps {
  transactions: Transaction[];
  userName: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ transactions, userName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `Olá ${userName}! Sou sua assistente S-IA. Como posso ajudar com suas finanças hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getFinancialAdvice(input, transactions, userName);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const suggestions = [
    "Quanto gastei com comida?",
    "Minha renda este mês?",
    "Dicas para economizar",
    "Análise de gastos"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] py-4">
      <div className="flex items-center space-x-2 mb-6 p-4 bg-red-50 rounded-2xl border border-red-100">
        <div className="bg-red-600 p-2 rounded-xl text-white">
          <BrainCircuit size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-900">S-IA Santander</h3>
          <p className="text-[10px] text-red-600">Inteligência Artificial Financeira</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 hide-scrollbar px-1 mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-red-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-red-600" />
              <span className="text-[10px] text-gray-500 font-medium">Analisando suas finanças...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length < 3 && !isLoading && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => { setInput(s); }}
              className="text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte sobre seus gastos..."
          className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 pr-14 shadow-sm"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-2 bottom-2 bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;
