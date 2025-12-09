import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'agent', text: 'Hello. I am QuantPilot. I have analyzed 10K filings and market data. What specifically are you looking for?' }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggle = () => setIsOpen(!isOpen);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputRef.current?.value) return;

        const text = inputRef.current.value;
        setMessages(prev => [...prev, { role: 'user', text }]);
        inputRef.current.value = '';

        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'agent', text: "I'm focusing on report generation currently. Full chat capabilities will be enabled in Phase 2." }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggle}
                    className="bg-primary hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-surface border border-white/10 rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-surface border-b border-white/5 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="font-serif text-secondary font-medium">QuantPilot Assistant</span>
                        </div>
                        <button onClick={toggle} className="text-muted hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 h-80 overflow-y-auto bg-background/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user'
                                    ? 'bg-white/10 text-white rounded-br-none'
                                    : 'bg-primary/20 text-secondary border border-primary/20 rounded-bl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-surface border-t border-white/5">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Ask a follow-up..."
                                className="w-full bg-background border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 placeholder-muted"
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
