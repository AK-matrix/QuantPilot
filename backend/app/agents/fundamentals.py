import pandas as pd
import yfinance as yf

class FundamentalAgent:
    def analyze(self, ticker_obj: yf.Ticker):
        """
        Extracts fundamental metrics from YFinance object.
        """
        info = ticker_obj.info
        
        # Key ratios
        metrics = {
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "peg_ratio": info.get("pegRatio"),
            "price_to_book": info.get("priceToBook"),
            "roe": info.get("returnOnEquity"),
            "profit_margins": info.get("profitMargins"),
            "debt_to_equity": info.get("debtToEquity"),
            "free_cash_flow": info.get("freeCashflow"),
            "revenue_growth": info.get("revenueGrowth"),
            "earnings_growth": info.get("earningsGrowth"),
            "target_price_mean": info.get("targetMeanPrice"),
            "recommendation": info.get("recommendationKey"),
        }
        
        # Simple analysis text generation
        analysis_points = []
        if metrics["roe"] and metrics["roe"] > 0.15:
            analysis_points.append("Strong ROE (>15%), indicating efficient capital use.")
        
        if metrics["debt_to_equity"] and metrics["debt_to_equity"] > 200:
            analysis_points.append("High leverage (Debt/Equity > 200). Risk factor.")
            
        metrics["analysis_summary"] = analysis_points
        return metrics
