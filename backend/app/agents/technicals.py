import pandas as pd
import pandas_ta as ta
import yfinance as yf

class TechnicalAgent:
    def analyze(self, ticker_obj: yf.Ticker):
        """
        Performs technical analysis on historical data.
        """
        # Fetch 1 year of data
        df = ticker_obj.history(period="1y")
        
        if df.empty:
            return {"error": "No historical data found"}

        # Calculate Indicators
        # SMA
        df["SMA_50"] = ta.sma(df["Close"], length=50)
        df["SMA_200"] = ta.sma(df["Close"], length=200)
        
        # RSI
        df["RSI"] = ta.rsi(df["Close"], length=14)
        
        # MACD
        macd = ta.macd(df["Close"])
        df = pd.concat([df, macd], axis=1)

        # Current values
        current_price = df["Close"].iloc[-1]
        sma_50 = df["SMA_50"].iloc[-1]
        sma_200 = df["SMA_200"].iloc[-1]
        rsi = df["RSI"].iloc[-1]
        
        # Trend detection
        trend = "Neutral"
        if current_price > sma_50 > sma_200:
            trend = "Bullish"
        elif current_price < sma_50 < sma_200:
            trend = "Bearish"
            
        signals = []
        if rsi > 70:
            signals.append("RSI Overbought (>70)")
        elif rsi < 30:
            signals.append("RSI Oversold (<30)")
            
        if sma_50 > sma_200:
            signals.append("Golden Cross (SMA50 > SMA200) present")
        elif sma_50 < sma_200:
            signals.append("Death Cross (SMA50 < SMA200) present")

        return {
            "current_price": current_price,
            "sma_50": sma_50,
            "sma_200": sma_200,
            "rsi": rsi,
            "trend": trend,
            "signals": signals,
            "history_stats": {
                "52_week_high": df["High"].max(),
                "52_week_low": df["Low"].min()
            }
        }
