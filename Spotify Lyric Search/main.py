import pandas as pd
from src.model import LyricModel
from src.predict import predict_song

DATA_PATH = "data/spotify_lyrics.csv"


"""Load and prepare the lyrics dataset."""
def load_data(path):
    df = pd.read_csv(path)

    # Normalize column names
    df = df.rename(columns={
        "song": "track_name",
        "artist": "artist_name",
        "text": "lyrics"
    })

    return df[["track_name", "artist_name", "lyrics"]].dropna()

"""
    Read lyric snippet.
    User can enter multiple lines.
"""
def get_user_snippet():

    lines = []
    while True:
        line = input()
        if not line.strip():
            break
        lines.append(line)

    return " ".join(lines).strip()


"""print prediction results."""
def display_results(results):
    print("\nPrediction Results:")
    for i, r in enumerate(results, start=1):
        print(
            f"{i}. {r['song']} — {r['artist']} "
            f"(confidence: {r['confidence']})"
        )
    print("-" * 50)


def main():
    print("\nSpotify Lyric Search\n")

    # Load data & train model once
    df = load_data(DATA_PATH)

    model = LyricModel()
    model.fit(df)

    print("Model ready. Enter lyrics snippet to search (Ctrl+C to exit).")

    while True:
        try:
            snippet = get_user_snippet()

            if not snippet:
                print("Please enter some lyrics.")
                continue

            results = predict_song(model, snippet)
            display_results(results)

        except KeyboardInterrupt:
            print("\nExiting.")
            break


if __name__ == "__main__":
    main()
