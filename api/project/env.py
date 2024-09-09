from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv('../.env'))

_env = { key: os.getenv(key) for key in os.environ }


