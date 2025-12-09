import yfinance as yf

class SourceLocator:
    def __init__(self):
        pass

    def locate_sources(self, ticker_symbol: str):
        """
        Identifies available data sources for a ticker.
        """
        ticker = yf.Ticker(ticker_symbol)
        
        # Check if we can get basic info (validator)
        try:
            _ = ticker.info
        except Exception:
            return {"error": f"Ticker {ticker_symbol} not found or API error"}

        sources = {
            "primary": "Yahoo Finance API",
            "sec_filings_url": f"https://www.sec.gov/cgi-bin/browse-edgar?CIK={ticker_symbol}",
            "ticker_obj": ticker  # Passing the object for other agents to use (optimization)
        }
        return sources
