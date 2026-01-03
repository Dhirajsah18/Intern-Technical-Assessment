import pandas as pd
from src.config import DATA_PATH

# Load and preprocess
def load_travel_data():
    
    # Load the CSV file
    df = pd.read_csv(DATA_PATH)

    # Normalize column names: remove whitespace and convert to lowercase
    df.columns = df.columns.str.strip().str.lower()

    # Rename columns to shorter, more code-friendly names
    df = df.rename(columns={
        "google review rating": "rating",
        "number of google review in lakhs": "popularity",
        "time needed to visit in hrs": "visit_hours",
        "entrance fee in inr": "entry_fee",
        "airport with 50km radius": "airport_nearby",
        "weekly off": "weekly_off",
        "best time to visit": "best_time"
    })

    return df
