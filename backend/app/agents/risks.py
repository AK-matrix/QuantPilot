import yfinance as yf

class RiskAgent:
    def analyze(self, ticker_obj: yf.Ticker):
        """
        Analyzes news and events for risk factors.
        """
        news = ticker_obj.news
        
        risk_keywords = ["lawsuit", "sue", "investigation", "fraud", "crash", "plunge", "downgrade", "layoff", "cut"]
        
        detected_risks = []
        
        for item in news:
            title = item.get("title", "").lower()
            for kw in risk_keywords:
                if kw in title:
                    detected_risks.append({
                        "type": "News Alert",
                        "keyword": kw,
                        "title": item.get("title"),
                        "link": item.get("link"),
                        "publisher": item.get("publisher")
                    })
        
        # Institutional Holders changes (simple proxy)
        # Using major holders if available, else skipping deep holder analysis for MVP
        
        # Short Interest (if available in info)
        info = ticker_obj.info
        short_ratio = info.get("shortRatio", 0)
        
        if short_ratio > 5:
            detected_risks.append({
                "type": "Short Interest",
                "message": f"High short ratio: {short_ratio}",
                "severity": "Medium"
            })

        return {
            "risk_score": len(detected_risks) * 10,  # Arbitrary MVP scoring
            "alerts": detected_risks,
            "news_summary": [n.get("title") for n in news[:3]] # Recent 3 headlines
        }
