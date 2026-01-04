import re
import string

# Cleans lyrics text
def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""

    text = text.lower()
    text = re.sub(r"\[.*?\]", "", text)  # remove [chorus]
    text = re.sub(r"\d+", "", text)      # remove numbers
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text)

    return text.strip()
