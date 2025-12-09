import { useState } from 'react';
import TickerInput from '../components/TickerInput';
import ReportView from '../components/ReportView';

interface ReportData {
    ticker: string;
    executive_summary: string;
    fundamentals: any;
    technicals: any;
    risks: any;
    sources: any;
}

export default function Home() {
    const [report, setReport] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (ticker: string) => {
        setLoading(true);
        setError('');
        setReport(null);

        try {
            const response = await fetch(`http://localhost:8000/api/report/${ticker}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || 'Failed to fetch report');
            }
            const data = await response.json();
            setReport(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
            {/* Header Section */}
            <header className="text-center mb-16 space-y-6">
                <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-white/95">
                    QuantPilot
                </h1>
                <p className="text-xl text-muted font-sans max-w-2xl mx-auto leading-relaxed">
                    Institutional-grade equity research.
                    <br />
                    Autonomous. Sourced. Precise.
                </p>
            </header>

            <main className="space-y-12">
                <TickerInput onSearch={handleSearch} loading={loading} />

                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-200 text-center font-sans">
                        {error}
                    </div>
                )}

                {report && <ReportView report={report} />}
            </main>
        </div>
    );
}
