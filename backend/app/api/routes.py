from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.agents.report_composer import ReportComposer
from app.db.database import save_report, get_report

router = APIRouter()
composer = ReportComposer()

@router.get("/report/{ticker}")
async def get_stock_report(ticker: str, force_refresh: bool = False):
    """
    Generates or retrieves a report for a given ticker.
    """
    ticker = ticker.upper()
    
    if not force_refresh:
        cached = get_report(ticker)
        if cached:
            return cached

    try:
        # Generate new report
        report = composer.generate_report(ticker)
        
        if "error" in report:
            raise HTTPException(status_code=404, detail=report["error"])
            
        # Save to DB
        save_report(ticker, report)
        
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ingest/{ticker}")
async def ingest_ticker(ticker: str, background_tasks: BackgroundTasks):
    """
    Trigger background ingestion for a ticker (Phase 2 feature, placeholder)
    """
    return {"status": "Ingestion queued", "ticker": ticker}
