# importing the required libraries
from flask import Flask, render_template, request, redirect, url_for
from joblib import load
from get_tweets import get_related_tweets
import os

# load the pipeline object
# pipeline = load("text_classification.joblib")

# function to get results for a particular text query
def requestResults(name, pipeline):
    # get the tweets text
    tweets = get_related_tweets(name)
    # get the prediction
    tweets['prediction'] = pipeline.predict(tweets['tweet_text'])
    # get the value counts of different labels predicted
    
    header = str(tweets.prediction.value_counts()) + '\n\n'
    rows = []
    for i in range(50):
        rows.append({'tweet_text':tweets['tweet_text'][i], 'created_at': tweets['created_at'][i], 'tweet_id': tweets['tweet_id'][i], 'prediction': tweets['prediction'][i]})
    return rows

    # start flask
app = Flask(__name__)

# render default webpage
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/analysis/')
def twitter_page():
    return render_template('twitter_analysis.html')

@app.route('/twitter_project_details/')
def twitter_project_details():
    return render_template('twitter_project_details.html')

@app.route('/graph/')
def graph():
    return render_template('graph.html')

@app.route('/graduation_project/')
def graduation_project():
    return render_template('graduation_project.html')

@app.route('/twitter_results/')
def twitter_results():
    return render_template('twitter_results.html')
    
@app.route('/', methods=['POST', 'GET'])
def get_data():
    if request.method == 'POST':
        user = request.form['search']
        # when the post method detect, then redirect to success function
        return redirect(url_for('success', name=user))

# get the data for the requested query
@app.route('/success/<name>')
def success(name):
    model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static", "models", "text_classification.joblib")
    pipeline = load(model_path)
    data = requestResults(name, pipeline)
    return render_template('twitter_results.html', data = data)


if __name__ == '__main__' :
    app.run(debug=True)