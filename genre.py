import pandas as pd
raw = pd.read_csv('data/hot_100_audio_features.csv')
print(raw.columns)
songs = []
genres = []
supergenres = []
ids = []
for row in raw.iterrows():
    genre_list = str(row[1].spotify_genre).replace('[','').replace(']','').strip().split(',')


    rock = 0
    pop = 0
    rap = 0
    hiphop = 0
    metal = 0
    country = 0
    other = 0
    jazz = 0
    house = 0
    rnb = 0
    latin = 0
    showtunes = 0
    folk = 0
    adult = 0
    soul = 0

    for genre in genre_list:
        if 'pop' in genre:
            pop += 1
        elif 'rock' in genre:
            rock += 1
        elif 'hip hop' in genre:
            hiphop += 1
        elif 'metal' in genre:
            metal += 1
        elif 'jazz' in genre:
            jazz += 1
        elif 'country' in genre:
            country += 1
        elif 'rap' in genre:
            rap += 1
        elif 'house' in genre:
            house += 1
        elif 'r&b' in genre:
            rnb += 1
        elif 'latin' in genre:
            latin += 1
        elif 'show tunes' in genre:
            showtunes += 1
        elif 'folk' in genre:
            folk += 1
        elif 'adult standards' in genre:
            adult += 1
        elif 'soul' in genre:
            soul += 1
        else:
            other += 1
        
    sg_list = ['metal','rock','country','r&b','hiphop','rap','jazz','house','latin','show tunes', 'folk','soul','pop','adult standards']
    genre_count = [metal, rock, country,rnb, hiphop, rap, jazz, house, latin, showtunes,folk,soul,pop,adult]
    m = max(genre_count)
    if m != 0:
        genre_champ = [i for i, j in enumerate(genre_count) if j == m]
        supergenre = sg_list[genre_champ[0]]
    else:
        supergenre = 'other'

    for genre in genre_list:
        ids.append(row[1].SongID)
        genres.append(genre)
        songs.append(row[1].Song)
        supergenres.append(supergenre)

    

genre_df = pd.DataFrame({ 'songid':ids,'song':songs, 'genre':genres, 'supergenre':supergenres}).dropna(how='any')
# print(genre_df['genre'].nunique())

genre_df.to_csv("songGenre.csv")
print("Finished!")