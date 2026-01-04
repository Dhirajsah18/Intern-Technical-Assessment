import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

from src.preprocess import clean_text

# lyrics vectorization
class LyricModel:
    
    def __init__(self):
        # Create vectorizer with English stop words and bigram features
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            max_features=30000
        )
        # Initialize matrix and data storage
        self.tfidf_matrix = None
        self.data = None

    # Fit the model on the provided dataframe
    def fit(self, df: pd.DataFrame):
        
        df["clean_lyrics"] = df["lyrics"].apply(clean_text)
        self.data = df
        # Transform cleaned lyrics to TF-IDF matrix
        self.tfidf_matrix = self.vectorizer.fit_transform(df["clean_lyrics"])
