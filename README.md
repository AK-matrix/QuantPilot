# ProofQuant (In Progress)

QuantPilot is a research system for public equities that refuses to guess. 
Give it a stock ticker and it builds a structured, source-backed report that combines fundamentals, technicals, and real-world events into a single, coherent narrative.

Most investor tools scrape a price chart and call it analysis. QuantPilot reads the documents that matter: SEC filings, earnings transcripts, balance sheets, risk disclosures, and market structure data. It treats every claim as a hypothesis to be tested, not a prompt to be completed.

If a number appears, it came from somewhere. QuantPilot shows you exactly where.

---

## Why this exists

Equity research is simultaneously overloaded with information and starving for interpretation. Retail platforms drown users in dashboards and indicators without explaining what any of it means. General-purpose AI models summarize the internet without judgment or accountability.

QuantPilot is opinionated:  
- information without provenance isn’t research  
- price action without context is noise  
- fundamentals without history are cherry-picked  
- risk without disclosure is marketing

The system uses programmatic extraction, time-series analysis, and multi-source verification to produce reports that hold up under scrutiny. It doesn’t predict the future. It tells you what is happening, why it matters, and where the evidence lives.

---

## What it does (MVP)

1. **Data Intake**
   - Locates primary sources for a company: 10-K/10-Q filings, earnings reports, price history, insider activity, and curated news
   - Stores raw documents and extracts relevant sections

2. **Fundamental Analysis**
   - Computes trends in revenue, margin, leverage, liquidity, and cash generation
   - Flags anomalies such as goodwill spikes, deteriorating balance sheets, or inconsistent disclosures

3. **Technical Assessment**
   - Identifies key levels and patterns using SMA/EMA, RSI, MACD, and volume structures
   - Highlights shifts in momentum and strength rather than one-day movements

4. **Event and Risk Layer**
   - Surfaces layoffs, executive changes, lawsuits, rating changes, and missed guidance
   - Scores their potential impact based on historical outcomes

5. **Source-backed Output**
   - Produces a clean, Claude-style research panel
   - Every metric and interpretation links to its original paragraph or table

No hallucinations. No filler. No “according to some reports”.

---

## What QuantPilot is not

It is not a stock tip generator.  
It does not predict short-term prices.  
It does not ingest random blogs or social media.  

A machine can only think clearly if it knows what to ignore.

---

## Architecture Overview

The backend coordinates a set of agents that extract numbers from filings, compute technical signals from price series, and classify real-world events. Each component publishes structured artifacts that can be traced back to the original document.

Storage is divided into:
- a relational store for computed fundamentals
- a vector index for text fragments and citations
- object storage for filings and transcripts

The UI is intentionally understated. If the content is grounded, design doesn't need to shout.

---

## Roadmap

- add Q&A interface over historical reports
- watchlists with change alerts
- earnings call sentiment trajectories
- industry-relative scoring and comparable sets

The long-term goal is simple: make retail investors research like professionals without turning them into data janitors.

---

## Status

Active development. Reports for initial tickers are functioning end-to-end, with fundamentals and technicals reconciled under a single scoring model. Work is ongoing on risk segmentation and citation UX.

If research is a discipline, QuantPilot is an instrument, not a toy.
