# import required libraries
import tweepy
import time
import pandas as pd
pd.set_option('display.max_colwidth', 1000)

# api key
api_key = ""
# api secret key
api_secret_key = ""
# access token
access_token = ""
# access token secret
access_token_secret = ""

# authorization the API Key
authentication = tweepy.OAuthHandler(api_key, api_secret_key)

# authorization to user's access token and access token secret
authentication.set_access_token(access_token, access_token_secret)

# call the api
api = tweepy.API(authentication, wait_on_rate_limit = True)

def get_related_tweets(text_query):
    # list to store tweets
    tweets_list = []
    # number of tweets
    count = 50
    try:
        # Pulling individual tweets from query
        for tweet in api.search(q = text_query, count = count):
            print(tweet.text)
            # Adding to list that contains all tweets
            tweets_list.append({'created_at': tweet.created_at, 'tweet_id': tweet.id, 'tweet_text': tweet.text})
        return pd.DataFrame.from_dict(tweets_list)

    except BaseException as e:
        print('failed on_status,', str(e))
        time.sleep(3)
