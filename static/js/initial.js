// Gathering input values from user via webpagevar genre = d3.select("#genre").property("value");
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
var week_pos = d3.select("#week_pos").property("value");
var instance = d3.select("#instance").property("value");
var weeks_on_chart = d3.select("#weeks_on_chart").property("value");

// Scale the values between -1 and 1 to make the graph look more normal
console.log(genre, explicit, duration, popularity, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, time_signature, week_pos, instance, weeks_on_chart);
var explicitVal = parseInt(explicit);//Math.ceil(parseInt(explicit) * 300);
var durationVal = parseInt(duration) / 3079157;//Math.ceil(parseInt(duration) * 0.0001);
var popularityVal = parseInt(popularity) / 100;//Math.ceil(parseInt(popularity) * 3);
var danceabilityVal = parseFloat(danceability);//Math.ceil(parseFloat(danceability) * 300);
var energyVal = parseFloat(energy);//Math.ceil(parseFloat(energy) * 300);
var keyVal = parseInt(key) / 11;//Math.ceil(parseInt(key) * 60);
var loudnessVal = parseFloat(loudness) / 60;//Math.ceil(parseFloat(loudness)) + 300;
var modeVal = parseInt(mode);//Math.ceil(parseInt(mode) * 300);
var speechinessVal = parseFloat(speechiness);//Math.ceil(parseFloat(speechiness) * 300);
var acousticnessVal = parseFloat(acousticness);//Math.ceil(parseFloat(acousticness) * 300);
var instrumentalnessVal = parseFloat(instrumentalness);///Math.ceil(parseFloat(instrumentalness) * 300);
var livenessVal = parseFloat(liveness);//Math.ceil(parseFloat(liveness) * 300);
var valenceVal = parseFloat(valence);//Math.ceil(parseFloat(valence) * 300);
var tempoVal = parseInt(tempo) / 250;//Math.ceil(parseInt(tempo) + 50);
var time_signatureVal = parseInt(time_signature) / 5;//Math.ceil(parseInt(time_signature) * 60);
var week_posVal = Math.abs(parseInt(week_pos) - 100) / 100;//Math.ceil(parseInt(pos) * 3);
var instanceVal = parseInt(instance) / 9;
var weeks_on_chartVal = parseInt(weeks_on_chart) / 87;

// List of input values
data = [explicitVal, durationVal, popularityVal, danceabilityVal, energyVal, keyVal, loudnessVal, modeVal, speechinessVal, acousticnessVal, instrumentalnessVal, livenessVal, valenceVal, tempoVal, time_signatureVal, week_posVal, instanceVal, weeks_on_chartVal];

// Create a horizontal bar chart using chart.js
Chart.defaults.global.defaultFontFamily = "Lato";

var horizontalBarChart = new Chart(myChart, {
    type: "horizontalBar",
    data: {
        labels: ["explicit", "duration", "popularity", "danceability", "energy", "key", "loudness", "mode", "speechiness", "acousticness", "instrumentalness", "liveness", "valence", "tempo", "time_signature", "pos", "instance", "weeks_on_chart"],
        datasets: [{
            barThickness: "flex",
            data: data,
            backgroundColor: ["#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00", "#f01c00"],
        }]
    },
    options: {
        animation: {
            duration: 0, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize

        legend: {
            display: false,
        },
        tooltips: {
            enabled: false
        },
        scales: {
            yAxes: [{
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