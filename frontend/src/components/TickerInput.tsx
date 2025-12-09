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
        <div className="w-full max-w-lg mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ENTER TICKER (e.g. AAPL)"
                    className="w-full bg-slate-800 border-2 border-slate-700 text-slate-100 placeholder-slate-500 text-lg px-6 py-4 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono tracking-wider"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'SCANNING...' : 'HUNT'}
                </button>
            </form>
        </div>
    );
}
