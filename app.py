#import dependencies
from flask import Flask, jsonify
from keras.models import load_model
import pandas as pd
from pickle import load

model = load_model('./Models/billb_spot_DL.h5')

scaler = load(open('scaler.pkl', 'rb'))
# Flask Setup

app = Flask(__name__)

# need input as a dataframe. then you need to scale the input. 

@app.route("/")
def deepBillBoard():
    out = model.predict(pd.DataFrame(minput))
    return(out)












if __name__ == "__main__":
    app.run(debug=True)



