var explicit = d3.select("#explicit").property("value");
    var duration = d3.select("#duration").property("value");
    var popularity = d3.select("#popularity").property("value");
    var danceability = d3.select("#danceability").property("value");
    var energy = d3.select("#energy").property("value");
    var key = d3.select("#key").property("value");
    var loudness = d3.select("#loudness").property("value");
    var mode = d3.select("#mode").property("value");
    var speechiness = d3.select("#speechiness").property("value");
    var acousticness = d3.select("#acousticness").property("value");
    var instrumentalness = d3.select("#instrumentalness").property("value");
    var liveness = d3.select("#liveness").property("value");
    var valence = d3.select("#valence").property("value");
    var tempo = d3.select("#tempo").property("value");
    var time_signature = d3.select("#time_signature").property("value");
    var pos = d3.select("#pos").property("value");

    console.log(explicit, duration, popularity, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, time_signature, pos);
    var explicitVal = parseInt(explicit);//Math.ceil(parseInt(explicit) * 300);
    var durationVal = parseInt(duration) / 3079157;//Math.ceil(parseInt(duration) * 0.0001);
    var popularityVal = parseInt(popularity)/100;//Math.ceil(parseInt(popularity) * 3);
    var danceabilityVal = parseFloat(danceability);//Math.ceil(parseFloat(danceability) * 300);
    var energyVal = parseFloat(energy);//Math.ceil(parseFloat(energy) * 300);
    var keyVal = parseInt(key)/11;//Math.ceil(parseInt(key) * 60);
    var loudnessVal = parseFloat(loudness)/60;//Math.ceil(parseFloat(loudness)) + 300;
    var modeVal = parseInt(mode);//Math.ceil(parseInt(mode) * 300);
    var speechinessVal = parseFloat(speechiness);//Math.ceil(parseFloat(speechiness) * 300);
    var acousticnessVal = parseFloat(acousticness);//Math.ceil(parseFloat(acousticness) * 300);
    var instrumentalnessVal = parseFloat(instrumentalness);///Math.ceil(parseFloat(instrumentalness) * 300);
    var livenessVal = parseFloat(liveness);//Math.ceil(parseFloat(liveness) * 300);
    var valenceVal = parseFloat(valence);//Math.ceil(parseFloat(valence) * 300);
    var tempoVal = parseInt(tempo)/250;//Math.ceil(parseInt(tempo) + 50);
    var time_signatureVal = parseInt(time_signature)/5;//Math.ceil(parseInt(time_signature) * 60);
    var posVal = Math.abs(parseInt(pos)-100)/100;//Math.ceil(parseInt(pos) * 3);

    data = [explicitVal, durationVal, popularityVal, danceabilityVal, energyVal, keyVal, loudnessVal, modeVal, speechinessVal, acousticnessVal, instrumentalnessVal, livenessVal, valenceVal, tempoVal, time_signatureVal, posVal];

    Chart.defaults.global.defaultFontFamily = "Lato";

    var horizontalBarChart = new Chart(myChart, {
        type: 'horizontalBar',
        data: {
            labels: ["explicit", "duration", "popularity", "danceability", "energy", "key", "loudness", "mode", "speechiness", "acousticness", "instrumentalness", "liveness", "valence", "tempo", "time_signature", "pos"],
            datasets: [{
                data: data,
                backgroundColor: ["#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8", "#73BFB8"],
            }]
        },
        options: {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [{
                    barPercentage: 0.75,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }

                }],
                xAxes: [{
                    gridLines: {
                        display: false,

                    },
                    ticks: {
                        display: false
                    }
                
                }]
            }
        }
    });