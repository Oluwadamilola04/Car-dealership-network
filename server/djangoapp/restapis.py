import os
from urllib.parse import quote

import requests
from dotenv import load_dotenv


load_dotenv()

backend_url = os.getenv(
    "BACKEND_URL",
    os.getenv("backend_url", default="http://localhost:3030")
)
sentiment_analyzer_url = os.getenv(
    "SENTIMENT_ANALYZER_URL",
    os.getenv("sentiment_analyzer_url", default="http://localhost:5050/")
)


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params
    print("GET from {} ".format(request_url))

    try:
        response = requests.get(request_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as err:
        print(f"Network exception occurred: {err}")
        return None


def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + quote(text, safe="")

    try:
        response = requests.get(request_url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as err:
        print(f"Network exception occurred: {err}")
        return None


def post_review(data_dict):
    request_url = backend_url + "/insert_review"

    try:
        response = requests.post(request_url, json=data_dict, timeout=10)
        response.raise_for_status()
        print(response.json())
        return response.json()
    except requests.RequestException as err:
        print(f"Network exception occurred: {err}")
        return None
