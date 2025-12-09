import chromadb
from chromadb.utils import embedding_functions

# Using default EF (all-MiniLM-L6-v2) which is downloaded automatically
# PersistentClient stores data to disk
client = chromadb.PersistentClient(path="./chroma_db")

def get_collection(name="financial_docs"):
    return client.get_or_create_collection(name=name)

def add_documents(ticker: str, documents: list[str], metadatas: list[dict]):
    collection = get_collection()
    ids = [f"{ticker}_{i}" for i in range(len(documents))]
    # Ensure metadata has ticker
    for m in metadatas:
        m["ticker"] = ticker
        
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

def query_documents(ticker: str, query: str, n_results: int = 5):
    collection = get_collection()
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"ticker": ticker}
    )
    return results
