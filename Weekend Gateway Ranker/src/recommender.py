from src.data_loader import load_travel_data
from src.distance import calculate_city_distance


def recommend_places(source_city, max_distance_km, top_n=5):
    df = load_travel_data()

    # Normalize user input
    source_city = source_city.strip().title()

    # Remove same city
    df = df[df["city"].str.lower() != source_city.lower()]

    # Calculate distance
    df["distance_km"] = df["city"].apply(
        lambda city: calculate_city_distance(source_city, city.strip())
    )

    # Remove rows where distance is unknown
    df = df.dropna(subset=["distance_km"])

    # User-defined distance filter
    df = df[df["distance_km"] <= max_distance_km]

    if df.empty:
        return df

    # Normalize values
    df["rating_norm"] = df["rating"] / df["rating"].max()
    df["popularity_norm"] = df["popularity"] / df["popularity"].max()
    df["distance_norm"] = 1 - (df["distance_km"] / df["distance_km"].max())

    # scoring
    df["score"] = (
        0.5 * df["distance_norm"] +
        0.3 * df["rating_norm"] +
        0.2 * df["popularity_norm"]
    )

    # One best place per city
    df = (
        df.sort_values("score", ascending=False)
        .groupby("city", as_index=False)
        .first()
    )
    output_columns = [
        "state",
        "city",
        "name",
        "distance_km",
        "popularity",
        "rating",
        "score",
        "visit_hours",
        "entry_fee",
        "airport_nearby",
        "weekly_off",
        "best_time", 
    ]

    return df.sort_values("score", ascending=False).head(top_n)[output_columns]
