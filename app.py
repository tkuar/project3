#import dependencies
from flask import Flask, jsonify, render_template, redirect

from keras.models import load_model
import pandas as pd
from pickle import load
import numpy as np
from scipy.spatial import distance

billboard_model = load_model('./Models/billb_spot_DL.h5')

X_scaler = load(open('scaler.pkl', 'rb'))
centers = pd.read_csv('data/kmeans_centers.csv')
clusters = pd.read_csv('data/kmeans_clusters.csv')
centers_array = centers.to_numpy()


app = Flask(__name__)



@app.route("/")
def deepBillBoard():

    return render_template("index.html")


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
    minput = minput.astype(np.float)


    minput_scaled = X_scaler.transform(minput)
    nn = billboard_model(minput_scaled, training=False)

    maxi = np.argmax(nn)

    report = f'A song like this might land in the {(maxi+1)*10}th Percentile of the Billboard Chart' 


    dists = []
    for i in range(len(centers_array)):
        dist = distance.euclidean(minput.to_numpy(),centers_array[i])
        dists.append(dist)
    
    selection = np.argmin(dists)
    similarSongs = clusters.loc[clusters['cluster']==selection]['track_id'].values.tolist()[0:4]

    reportout = {'peak_decile':str((maxi+1)*10), 'report':report, 'similar_songs': similarSongs}

    return render_template("index.html",dict=reportout)
    # return(reportout)









if __name__ == "__main__":
    app.run(debug=True)



