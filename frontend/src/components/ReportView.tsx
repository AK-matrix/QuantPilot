interface Props {
    report: any;
}

export default function ReportView({ report }: Props) {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Executive Summary */}
            <section className="bg-surface rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
                <h2 className="text-2xl font-serif text-white mb-6">Executive Summary</h2>
                <p className="text-secondary leading-relaxed font-sans text-lg opacity-90">
                    {report.executive_summary}
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Fundamentals */}
                <section className="bg-surface rounded-2xl p-8 border border-white/5 shadow-lg">
                    <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                        <span className="text-primary opacity-70">◆</span>
                        Fundamentals
                    </h2>
                    <div className="space-y-4 font-sans text-sm">
                        <Row label="Market Cap" value={formatNum(report.fundamentals.market_cap)} />
                        <Row label="P/E Ratio" value={report.fundamentals.pe_ratio} />
                        <Row label="ROE" value={report.fundamentals.roe ? (report.fundamentals.roe * 100).toFixed(2) + '%' : '-'} />
                        <Row label="Profit Margin" value={report.fundamentals.profit_margins ? (report.fundamentals.profit_margins * 100).toFixed(2) + '%' : '-'} />

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <h3 className="text-white/80 font-medium mb-3">Analysis</h3>
                            <ul className="space-y-2 text-muted list-disc pl-4">
                                {report.fundamentals.analysis_summary?.map((pt: string, i: number) => (
                                    <li key={i}>{pt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Technicals */}
                <section className="bg-surface rounded-2xl p-8 border border-white/5 shadow-lg">
                    <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                        <span className="text-primary opacity-70">⚡</span>
                        Technicals
                    </h2>
                    <div className="space-y-4 font-sans text-sm">
                        <Row label="Current Price" value={report.technicals.current_price?.toFixed(2)} />
                        <Row label="RSI (14)" value={report.technicals.rsi?.toFixed(2)} />
                        <Row label="Trend" value={report.technicals.trend} highlight={true} />

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <h3 className="text-white/80 font-medium mb-3">Signals</h3>
                            <ul className="space-y-2 text-muted list-disc pl-4">
                                {report.technicals.signals?.map((sig: string, i: number) => (
                                    <li key={i}>{sig}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            {/* Risks */}
            <section className="bg-surface rounded-2xl p-8 border border-white/5 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif text-white flex items-center gap-3">
                        <span className="text-primary opacity-70">⚠</span>
                        Risk Analysis
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.risks.risk_score > 50 ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'
                        }`}>
                        Risk Score: {report.risks.risk_score}
                    </span>
                </div>

                {report.risks.alerts?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.risks.alerts.map((alert: any, i: number) => (
                            <div key={i} className="bg-background/50 p-4 rounded-xl border border-white/5">
                                <div className="font-medium text-primary mb-1">{alert.type}</div>
                                <div className="text-sm text-secondary opacity-80">{alert.keyword || alert.message}</div>
                                {alert.title && <div className="text-xs text-muted mt-2 line-clamp-1">{alert.title}</div>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted italic">No specific risk signals detected in recent news flow.</p>
                )}
            </section>
        </div>
    );
}

function Row({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) {
    if (value === undefined || value === null) return null;
    return (
        <div className="flex justify-between items-center group hover:bg-white/5 p-2 rounded transition-colors -mx-2">
            <span className="text-muted">{label}</span>
            <span className={highlight ? "text-primary font-medium" : "text-secondary font-medium"}>
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
