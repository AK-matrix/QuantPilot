import { useState } from 'react';
import TickerInput from './components/TickerInput';
import ReportView from './components/ReportView';

interface ReportData {
  ticker: string;
  executive_summary: string;
  fundamentals: any;
  technicals: any;
  risks: any;
  sources: any;
}

function App() {
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
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-emerald-400">STOCK HUNTER</h1>
        <p className="text-slate-400">Autonomous Equity Research Agent</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <TickerInput onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-800 rounded text-red-200">
            Error: {error}
          </div>
        )}

        {report && <ReportView report={report} />}
      </main>
    </div>
  );
}

export default App;
