# 🎵 Spotify Lyric Search

A command-line based lyric search system that identifies the **most likely song and artist**
from a user-provided lyric snippet using **Natural Language Processing (NLP)** techniques.

This project treats lyric identification as a **text retrieval problem**, not simple classification.

---

## 📌 Features

- Search songs using **partial or full lyrics**
- Supports **multi-line lyric input**
- Returns **ranked results** (Top-K songs)
- Uses **TF-IDF + Cosine Similarity**
- Fast, lightweight, and easy to run locally
- Clean, human-readable, production-style code

---

## 🧠 How It Works

1. Lyrics are cleaned and preprocessed (lowercasing, punctuation removal, normalization)
2. TF-IDF converts lyrics into numerical vectors
3. Cosine similarity compares the user snippet with all songs
4. Songs are **ranked by similarity score**
5. Top-K results are returned (not forced single prediction)

> ⚠️ Important:  
> Short or generic lyric lines may appear in multiple songs.  
> In such cases, the system **ranks candidates instead of guessing one song**.

---

## 🛠️ Tech Stack

- **Python**
- **Pandas**
- **Scikit-learn**
- **TF-IDF Vectorizer**
- **Cosine Similarity**

---

## 📂 Project Structure
```
spotify-lyric-search/
│
├── data/
│ └── spotify_lyrics.csv
│
├── src/
│ ├── preprocess.py
│ ├── model.py
│ └── predict.py
│
├── main.py
├── requirements.txt
└── README.md
```

---

---

## 📦 Installation & Setup

### 1. Clone the repository
- git clone https://github.com/Dhirajsah18/Intern-Technical-Assessment.git
- cd spotify-lyric-search

### 2. Create virtual environment (recommended)
- python -m venv venv
- venv\Scripts\activate 

### 3. Install dependencies
- pip install -r requirements.txt

## How to Run
- python main.py

---