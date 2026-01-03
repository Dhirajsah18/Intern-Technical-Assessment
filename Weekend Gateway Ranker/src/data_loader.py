import pandas as pd
from src.config import DATA_PATH

# 
def load_travel_data():
    df = pd.read_csv(DATA_PATH)

    df.columns = df.columns.str.strip().str.lower()

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
