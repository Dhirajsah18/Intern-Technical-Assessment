import pandas as pd
import math

# Dataset Path
DATA_PATH = "data/Top Indian Places to Visit.csv"

# City Coordinates (Approx)
CITY_COORDS = {
    "Delhi": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "Bangalore": (12.9716, 77.5946),
    "Hyderabad": (17.3850, 78.4867),
    "Chennai": (13.0827, 80.2707),
    "Kolkata": (22.5726, 88.3639),
    "Jaipur": (26.9124, 75.7873),
    "Agra": (27.1767, 78.0081),
    "Pune": (18.5204, 73.8567),
    "Goa": (15.2993, 74.1240),
    "Ahmedabad": (23.0225, 72.5714),
    "Udaipur": (24.5854, 73.7125),
    "Amritsar": (31.6340, 74.8723),
    "Rishikesh": (30.0869, 78.2676),
    "Manali": (32.2396, 77.1887),
    "Shimla": (31.1048, 77.1734),
    "Dehradun": (30.3165, 78.0322),
    "Mussoorie": (30.4598, 78.0660),
    "Nainital": (29.3803, 79.4636),
    "Bhopal": (23.2599, 77.4126),
    "Indore": (22.7196, 75.8577),
    "Varanasi": (25.3176, 82.9739),
    "Lucknow": (26.8467, 80.9462),
    "Patna": (25.5941, 85.1376),
    "Bhubaneswar": (20.2961, 85.8245),
    "Visakhapatnam": (17.6868, 83.2185),
    "Kochi": (9.9312, 76.2673),
    "Trivandrum": (8.5241, 76.9366),
    "Mysore": (12.2958, 76.6394),
    "Coorg": (12.3375, 75.8069),
    "Chikmagalur": (13.3153, 75.7754)
}

# Haversine Distance
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # km
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1)*math.cos(lat2)*math.sin(dlon/2)**2
    return 2 * R * math.asin(math.sqrt(a))

# Recommendation Function
def recommend_places(source_city, top_n=5):
    df = pd.read_csv(DATA_PATH)

    # Clean column names
    df.columns = df.columns.str.strip().str.lower()

    # Rename needed columns
    df = df.rename(columns={
        "google review rating": "rating",
        "number of google review in lakhs": "popularity"
    })

    source_city = source_city.strip()

    if source_city not in CITY_COORDS:
        print(f"❌ Coordinates not available for {source_city}")
        return

    src_lat, src_lon = CITY_COORDS[source_city]

    # Remove same city
    df = df[df["city"].str.lower() != source_city.lower()]

    # Distance calculation
    def calculate_distance(city):
        city = city.strip()
        if city in CITY_COORDS:
            lat, lon = CITY_COORDS[city]
            return haversine(src_lat, src_lon, lat, lon)
        return None

    df["distance_km"] = df["city"].apply(calculate_distance)

    # Remove places without distance
    df = df.dropna(subset=["distance_km"])

    # Normalization
    df["rating_norm"] = df["rating"] / df["rating"].max()
    df["popularity_norm"] = df["popularity"] / df["popularity"].max()
    df["distance_norm"] = 1 - (df["distance_km"] / df["distance_km"].max())

    # Final Score
    df["score"] = (
        0.4 * df["rating_norm"] +
        0.3 * df["popularity_norm"] +
        0.3 * df["distance_norm"]
    )

    return df.sort_values("score", ascending=False).head(top_n)[
        ["city", "state", "name", "distance_km", "rating", "popularity", "score"]
    ]

# Main Execution
if __name__ == "__main__":
    test_cities = ["Delhi", "Mumbai", "Bangalore"]

    for city in test_cities:
        print("\n" + "=" * 50)
        print(f"Top Weekend Destinations from {city}")
        print("=" * 50)
        print(recommend_places(city))
