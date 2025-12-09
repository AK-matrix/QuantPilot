import sqlite3
import json
from datetime import datetime

DB_PATH = "stock_hunter.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # Table for stock fundamentals
    c.execute('''CREATE TABLE IF NOT EXISTS fundamentals
                 (ticker TEXT PRIMARY KEY, 
                  data TEXT, 
                  updated_at TEXT)''')
    
    # Table for reports
    c.execute('''CREATE TABLE IF NOT EXISTS reports
                 (ticker TEXT PRIMARY KEY, 
                  report_json TEXT, 
                  created_at TEXT)''')
    conn.commit()
    conn.close()

import numpy as np
import pandas as pd

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, pd.Timestamp):
            return obj.isoformat()
        return super(NpEncoder, self).default(obj)

def save_fundamentals(ticker: str, data: dict):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO fundamentals (ticker, data, updated_at) VALUES (?, ?, ?)",
              (ticker, json.dumps(data, cls=NpEncoder), datetime.now().isoformat()))
    conn.commit()
    conn.close()

def get_fundamentals(ticker: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT data FROM fundamentals WHERE ticker=?", (ticker,))
    row = c.fetchone()
    conn.close()
    if row:
        return json.loads(row[0])
    return None

def save_report(ticker: str, report: dict):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO reports (ticker, report_json, created_at) VALUES (?, ?, ?)",
              (ticker, json.dumps(report, cls=NpEncoder), datetime.now().isoformat()))
    conn.commit()
    conn.close()

def get_report(ticker: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT report_json FROM reports WHERE ticker=?", (ticker,))
    row = c.fetchone()
    conn.close()
    if row:
        return json.loads(row[0])
    return None
