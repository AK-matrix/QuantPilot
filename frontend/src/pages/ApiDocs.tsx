export default function ApiDocs() {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white/95 mb-12">
                API Reference
            </h1>

            <div className="space-y-12">
                <section>
                    <p className="text-lg text-muted font-sans font-light">
                        Programmatic access to the QuantPilot research engine. <br />
                        All endpoints return JSON responses and require no authentication for the MVP tier.
                    </p>
                </section>

                {/* Endpoint Card */}
                <div className="bg-surface rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <div className="bg-black/30 px-6 py-4 flex items-center gap-4 border-b border-white/5">
                        <span className="bg-green-500/20 text-green-400 font-mono text-sm px-2 py-1 rounded">GET</span>
                        <span className="font-mono text-white text-sm md:text-base">/api/report/{'{ticker}'}</span>
                    </div>

                    <div className="p-8 space-y-6">
                        <p className="text-secondary">
                            Generates a full research report for the specified ticker symbol.
                            Triggers a real-time analysis pipeline if data is stale.
                        </p>

                        <div>
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Parameters</h3>
                            <div className="flex gap-12 font-mono text-sm">
                                <div>
                                    <span className="text-primary">ticker</span>
                                    <span className="text-muted ml-2">(string)</span>
                                </div>
                                <div className="text-secondary/80">The stock symbol (e.g. NVDA, TSLA)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Response</h3>
                            <div className="bg-background rounded-xl p-4 overflow-x-auto border border-white/5">
                                <pre className="font-mono text-sm text-secondary/70">
                                    {`{
  "ticker": "AAPL",
  "timestamp": "2024-03-20T14:30:00Z",
  "executive_summary": "Strong fundamentals...",
  "fundamentals": { ... },
  "technicals": { ... },
  "risks": { ... }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
