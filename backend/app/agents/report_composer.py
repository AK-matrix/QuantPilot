from .locator import SourceLocator
from .fundamentals import FundamentalAgent
from .technicals import TechnicalAgent
from .risks import RiskAgent

class ReportComposer:
    def __init__(self):
        self.locator = SourceLocator()
        self.fundamental = FundamentalAgent()
        self.technical = TechnicalAgent()
        self.risk = RiskAgent()

    def generate_report(self, ticker: str):
        # 1. Locate Sources
        sources = self.locator.locate_sources(ticker)
        if "error" in sources:
            return sources
            
        ticker_obj = sources["ticker_obj"]
        
        # 2. Run Agents Parallel (Sequential for MVP)
        fund_data = self.fundamental.analyze(ticker_obj)
        tech_data = self.technical.analyze(ticker_obj)
        risk_data = self.risk.analyze(ticker_obj)
        
        # 3. Compile
        # Clean up sources (remove objects)
        if "ticker_obj" in sources:
            del sources["ticker_obj"]
            
        report = {
            "ticker": ticker,
            "timestamp": "Now",
            "executive_summary": self._generate_summary(ticker, fund_data, tech_data, risk_data),
            "fundamentals": fund_data,
            "technicals": tech_data,
            "risks": risk_data,
            "sources": sources
        }
        
        # Save to DB (TODO: import database save function)
        return report

    def _generate_summary(self, ticker, fund, tech, risk):
        """
        Synthesizes a text summary.
        """
        trend = tech.get("trend", "Neutral")
        rec = fund.get("recommendation", "N/A")
        risk_score = risk.get("risk_score", 0)
        
        summary = f"Report for {ticker}. "
        summary += f"Current technical trend is {trend}. "
        summary += f"Analyst recommendation consensus is {rec}. "
        
        if risk_score > 20:
            summary += "CAUTION: Elevated risk signals detected. "
        else:
            summary += "Risk factors appear nominal. "
            
        return summary
