export default function Methodology() {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white/95 mb-12">
                Methodology
            </h1>

            <div className="space-y-12 text-secondary font-sans leading-relaxed text-lg">
                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">First Principles</h2>
                    <p className="text-muted">
                        QuantPilot is built on a single axiom: <span className="text-secondary font-medium">Information without provenance is noise.</span>
                        Unlike generative models that hallucinate plausible-sounding prose, our system treats every financial metric as a claim requiring evidence.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-surface p-8 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-serif text-white mb-3">1. Source Locator</h3>
                        <p className="text-muted text-base">
                            We begin by locating authoritative documents for the target equity.
                            Primary sources include SEC filings (10-K, 10-Q), earnings transcripts, and exchange-verified price data.
                        </p>
                    </div>
                    <div className="bg-surface p-8 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-serif text-white mb-3">2. Extraction & Verify</h3>
                        <p className="text-muted text-base">
                            Specialized agents parse unstructured text (HTML/PDF) into structured data.
                            We cross-reference reported KPIs against computed ratios to ensure accounting consistency.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-serif text-primary mb-4">The Analysis Engine</h2>
                    <p className="text-muted mb-4">
                        Our multi-agent architecture decomposes the research process into specialized domains:
                    </p>
                    <ul className="list-none space-y-4 pl-4 border-l-2 border-primary/20">
                        <li>
                            <strong className="text-white">Fundamental Agent:</strong> Evaluates business health using DuPont analysis, cash flow quality, and balance sheet stress tests.
                        </li>
                        <li>
                            <strong className="text-white">Technical Agent:</strong> Identifies market structure, trend direction, and momentum anomalies using statistical signal processing.
                        </li>
                        <li>
                            <strong className="text-white">Risk Agent:</strong> Monitors event-driven risks by analyzing sentiment patterns in news flow and legal disclosures.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
