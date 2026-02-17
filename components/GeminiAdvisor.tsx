import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Cpu, Minimize2, Maximize2 } from 'lucide-react';
import { getTacticalAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'AAA Actual online. Secure line established. What is your mission requirement?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMinimized]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getTacticalAdvice(input);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${isMinimized ? 'w-auto' : 'w-full max-w-md'}`}>
      
      {/* Header */}
      <div 
        className="bg-military-800 border border-military-accent/50 p-3 flex justify-between items-center cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2 text-military-accent font-mono font-bold tracking-wider">
          <Cpu className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
          <span className="uppercase">Tactical Advisor AI</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <div className="bg-black/90 border-x border-b border-military-accent/30 h-96 flex flex-col backdrop-blur-md">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-military-600">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 border-l-2 ${
                    msg.role === 'user' 
                      ? 'bg-military-800 border-white text-gray-200' 
                      : 'bg-military-900/80 border-military-accent text-military-accent'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-50 block mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-military-accent text-xs animate-pulse ml-2">
                &gt; Processing intelligence...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-military-accent/30 bg-military-900 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter query..."
              className="flex-1 bg-transparent border border-military-700 text-white font-mono px-3 py-2 focus:outline-none focus:border-military-accent text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-military-accent hover:bg-military-accentHover text-black p-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAdvisor;