import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

from src.preprocess import clean_text

class LyricModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            max_features=30000
        )
        self.tfidf_matrix = None
        self.data = None

    def fit(self, df: pd.DataFrame):
        df["clean_lyrics"] = df["lyrics"].apply(clean_text)
        self.data = df
        self.tfidf_matrix = self.vectorizer.fit_transform(df["clean_lyrics"])
