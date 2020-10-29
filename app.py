#import dependencies
from flask import Flask, jsonify
from keras.models import load_model
import pandas as pd
from pickle import load
import numpy as np

billboard_model = load_model('./Models/billb_spot_DL.h5')

X_scaler = load(open('scaler.pkl', 'rb'))

app = Flask(__name__)


@app.route("/")
def deepBillBoard():
    return("Hello, i think it's working")


@app.route("/deepBillboard/song_param=<song_params>")
def deepSong(song_params):

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
    'weeks_on_chart':song_param[17]}, 
    index = [0])

    minput['genre'] = minput['genre'].replace('pop',float(0)).replace('country',float(1)).replace('hiphop',float(2)).replace('other',float(3)).replace('latin',float(3)).replace('latin',float(4)).replace('house',float(5)).replace('folk',float(6)).replace('r&b',float(7)).replace('adult standards',float(8)).replace('rock',float(9)).replace('metal',float(10)).replace('show tunes',float(11)).replace('soul',float(12)).replace('rap',float(13)).replace('jazz',float(14))
    

    minput_scaled = X_scaler.transform(minput)
    nn = billboard_model(minput_scaled, training=False)

    maxi = np.argmax(nn)

    report = f'{maxi} : A song like this might land in the {(maxi+1)*10}th Percentile of the Billboard Chart' 


    return(report)









if __name__ == "__main__":
    app.run(debug=True)



