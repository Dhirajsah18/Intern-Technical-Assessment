from src.recommender import recommend_places
import pandas as pd

# Configure pandas display settings
pd.set_option("display.max_columns", None)  # Show all columns
pd.set_option("display.width", 1000)  # Set wider display width


def main():

    print("Weekend Gateway Recommendation Engine")
    print("-" * 50)

    # Get source city from user input (title case)
    source_city = input("Enter source city: ").strip().title()

    # Get maximum travel distance
    try:
        max_distance = int(
            input("Enter max travel distance (km) [e.g. 300 / 500 / 800]: ").strip()
        )
    except ValueError:
        print("Please enter a valid number for distance")
        return

    # Recommendations based on user inputs
    results = recommend_places(source_city, max_distance)

    # Display results
    print("\n" + "=" * 60)
    print(f"Top Weekend Destinations from {source_city} (within {max_distance} km)")
    print("=" * 60)

    if results.empty:
        print("No destinations found within this distance.")
    else:
        print(results.to_string(index=False))


if __name__ == "__main__":
    main()
