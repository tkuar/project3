#import dependencies
from flask import Flask, jsonify
from keras.models import load_model
import pandas as pd
from pickle import load
import numpy as np

billboard_model = load_model('./Models/billb_spot_DL.h5')
spotify_model = load_model('./Models/billb_spot_DL.h5')

X_scaler = load(open('scaler.pkl', 'rb'))
# Flask Setup

app = Flask(__name__)

# need input as a dataframe. then you need to scale the input. 

@app.route("/")
def deepBillBoard():
    # out = model.predict(pd.DataFrame(minput))
    return("Hello, i think it's working")


@app.route("/deepBillboard/song_param=<song_params>")
def deepSong(song_params):
    # out = model.predict(pd.DataFrame(minput))
    out = song_params.split(',')[-1]
    song_param = song_params.split(',')

    minput = pd.DataFrame({'genre': song_param[0],
    'spotify_track_explicit': song_param[1],
    'spotify_track_duration_ms': song_param[2],
    'spotify_track_popularity': song_param[3],
    'danceability': song_param[4],
    'energy': song_param[5],
    'key': song_param[6],
    'loudness': song_param[6],
    'mode': song_param[7],
    'speechiness': song_param[8],
    'acousticness': song_param[9],
    'instrumentalness': song_param[10],
    'liveness': song_param[11],
    'valence': song_param[12],
    'tempo': song_param[13],
    'time_signature': song_param[14],
    'week_pos': song_param[15],
    'instance': song_param[16],
    'peak_pos': song_param[17],
    'weeks_on_chart':song_param[18]}, 
    index = [0])

    minput_scaled = X_scaler.transform(minput)
    nn = billboard_model(minput_scaled, training=False)
    maxi = np.argmax(nn)
    report = f'{maxi} : A song like this might land in the {(maxi+1)*10}th Percentile of the Billboard Chart' 

    return(report)









if __name__ == "__main__":
    app.run(debug=True)



