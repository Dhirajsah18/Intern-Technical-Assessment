import math
from src.config import CITY_COORDS

#  Haversine Distance
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # km
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = math.sin(dlat / 2) ** 2 + \
        math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2

    return 2 * R * math.asin(math.sqrt(a))


def calculate_city_distance(source_city, destination_city):
    if source_city not in CITY_COORDS or destination_city not in CITY_COORDS:
        return None

    lat1, lon1 = CITY_COORDS[source_city]
    lat2, lon2 = CITY_COORDS[destination_city]

    return haversine(lat1, lon1, lat2, lon2)
