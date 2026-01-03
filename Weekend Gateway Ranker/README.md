# Local Travel Recommendation Engine (India)

## Description
A Python-based system that recommends top weekend travel destinations
from a given source city using distance, rating, and popularity.

---
## Project Structure
```
Weekend Gateway Ranker/
│
├── main.py                 # Entry point (user input & output)
├── requirements.txt
├── sample_output.txt
│
├── data/
│   └── Top Indian Places to Visit.csv
│
└── src/
    ├── __init__.py
    ├── config.py           # Dataset path & city coordinates
    ├── data_loader.py      # Load & clean dataset
    ├── distance.py         # Haversine distance logic
    └── recommender.py      # Recommendation engine

```
---

## Technologies Used
- Python
- Pandas

## Dataset
Top Indian Places to Visit (CSV)

## Recommendation Criteria
- Distance (Haversine formula)
- Tourist Rating
- Popularity

---

## How to Run
```bash
pip install -r requirements.txt
python main.py
```
### Provide Inputs
- Enter source city: Delhi
- Enter max travel distance (km): 800

---