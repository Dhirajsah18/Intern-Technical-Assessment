from src.recommender import recommend_places
import pandas as pd

pd.set_option("display.max_columns", None)
pd.set_option("display.width", 1000)


def main():
    print("Weekend Gateway Recommendation Engine")
    print("-" * 50)

    source_city = input("Enter source city: ").strip().title()

    try:
        max_distance = int(
            input("Enter max travel distance (km) [e.g. 300 / 500 / 800]: ").strip()
        )
    except ValueError:
        print("Please enter a valid number for distance")
        return

    results = recommend_places(source_city, max_distance)

    print("\n" + "=" * 60)
    print(f"Top Weekend Destinations from {source_city} (within {max_distance} km)")
    print("=" * 60)

    if results.empty:
        print("No destinations found within this distance.")
    else:
        print(results.to_string(index=False))


if __name__ == "__main__":
    main()
