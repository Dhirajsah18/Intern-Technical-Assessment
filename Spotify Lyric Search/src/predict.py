from sklearn.metrics.pairwise import cosine_similarity
from src.preprocess import clean_text

def predict_song(model, lyric_snippet, top_k=3):
    cleaned = clean_text(lyric_snippet)
    snippet_words = set(cleaned.split())

    # -----------------------------
    # TF-IDF similarity scores
    # -----------------------------
    vector = model.vectorizer.transform([cleaned])
    tfidf_scores = cosine_similarity(vector, model.tfidf_matrix)[0]

    combined_scores = []

    for idx, row in model.data.iterrows():
        lyrics_words = set(row["clean_lyrics"].split())

        # word overlap score (normalized)
        overlap = len(snippet_words & lyrics_words)
        overlap_score = overlap / max(len(snippet_words), 1)

        # final combined score
        final_score = (0.75 * tfidf_scores[idx]) + (0.25 * overlap_score)

        combined_scores.append((idx, final_score))

    # -----------------------------
    # Rank all songs
    # -----------------------------
    combined_scores.sort(key=lambda x: x[1], reverse=True)
    top_indices = combined_scores[:top_k]

    results = []
    for idx, score in top_indices:
        results.append({
            "song": model.data.iloc[idx]["track_name"],
            "artist": model.data.iloc[idx]["artist_name"],
            "confidence": round(float(score), 3)
        })

    return results
