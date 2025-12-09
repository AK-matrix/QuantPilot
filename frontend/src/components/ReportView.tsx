
interface Props {
    report: any;
}

export default function ReportView({ report }: Props) {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Executive Summary */}
            <section className="bg-slate-800 rounded-lg p-6 border-l-4 border-emerald-500">
                <h2 className="text-xl font-bold text-slate-200 mb-4 uppercase tracking-widest">Executive Summary</h2>
                <p className="text-slate-300 leading-relaxed font-mono">
                    {report.executive_summary}
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fundamentals */}
                <section className="bg-slate-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">FUNDAMENTALS</h2>
                    <div className="space-y-3 font-mono text-sm">
                        <Row label="Market Cap" value={formatNum(report.fundamentals.market_cap)} />
                        <Row label="P/E Ratio" value={report.fundamentals.pe_ratio} />
                        <Row label="ROE" value={report.fundamentals.roe} />
                        <Row label="Profit Margin" value={report.fundamentals.profit_margins} />

                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <h3 className="text-emerald-400 font-bold mb-2">Analysis:</h3>
                            <ul className="list-disc pl-4 text-slate-400">
                                {report.fundamentals.analysis_summary?.map((pt: string, i: number) => (
                                    <li key={i}>{pt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Technicals */}
                <section className="bg-slate-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">TECHNICALS</h2>
                    <div className="space-y-3 font-mono text-sm">
                        <Row label="Current Price" value={report.technicals.current_price?.toFixed(2)} />
                        <Row label="RSI (14)" value={report.technicals.rsi?.toFixed(2)} />
                        <Row label="Trend" value={report.technicals.trend} highlight={true} />

                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <h3 className="text-emerald-400 font-bold mb-2">Signals:</h3>
                            <ul className="list-disc pl-4 text-slate-400">
                                {report.technicals.signals?.map((sig: string, i: number) => (
                                    <li key={i}>{sig}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            {/* Risks */}
            <section className="bg-slate-800 rounded-lg p-6 border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-200 uppercase tracking-widest">Risk Analysis</h2>
                    <span className="bg-red-900/50 text-red-200 px-3 py-1 rounded font-mono text-sm">
                        Score: {report.risks.risk_score}
                    </span>
                </div>

                {report.risks.alerts?.length > 0 ? (
                    <div className="space-y-2">
                        {report.risks.alerts.map((alert: any, i: number) => (
                            <div key={i} className="bg-red-900/10 p-3 rounded flex items-start gap-3">
                                <span className="text-red-400 text-xl">⚠</span>
                                <div>
                                    <div className="font-bold text-red-200">{alert.type}</div>
                                    <div className="text-sm text-red-300">{alert.keyword || alert.message}</div>
                                    {alert.title && <div className="text-xs text-slate-500 mt-1">{alert.title}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 italic">No significant risk factors detected in recent news.</p>
                )}
            </section>
        </div>
    );
}

function Row({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) {
    if (value === undefined || value === null) return null;
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span className={highlight ? "text-emerald-400 font-bold" : "text-slate-300"}>
                {value}
            </span>
        </div>
    );
}

function formatNum(num: number) {
    if (!num) return "-";
    if (num > 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num > 1e6) return (num / 1e6).toFixed(2) + "M";
    return num.toLocaleString();
}
