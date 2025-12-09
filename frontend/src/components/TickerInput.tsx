import { useState } from 'react';

interface Props {
    onSearch: (ticker: string) => void;
    loading: boolean;
}

export default function TickerInput({ onSearch, loading }: Props) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim().toUpperCase());
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter ticker (e.g. AAPL)"
                    className="w-full relative z-10 bg-surface border border-white/10 text-white placeholder-muted text-lg px-8 py-5 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans shadow-xl"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-3 top-3 bottom-3 bg-white/5 hover:bg-white/10 text-primary font-medium px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-95 active:scale-90"
                >
                    {loading ? (
                        <span className="animate-pulse">Scanning...</span>
                    ) : (
                        <span>→</span>
                    )}
                </button>
            </form>
        </div>
    );
}
