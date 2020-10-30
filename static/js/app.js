// Event Listener that get users' inputs
d3.select(".data").on("change", function () {

    d3.event.preventDefault();

    // Gathering input values from user via webpage
    var genre = d3.select("#genre").property("value");
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

    // Log values from inputs
    console.log(genre, explicit, duration, popularity, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, time_signature, week_pos, instance, weeks_on_chart);

    // Scale the values between -1 and 1 to make the graph look more normal
    var explicitVal = parseInt(explicit);
    var durationVal = parseInt(duration) / 3079157;
    var popularityVal = parseInt(popularity) / 100;
    var danceabilityVal = parseFloat(danceability);
    var energyVal = parseFloat(energy);
    var keyVal = parseInt(key) / 11;
    var loudnessVal = parseFloat(loudness) / 60;
    var modeVal = parseInt(mode);
    var speechinessVal = parseFloat(speechiness);
    var acousticnessVal = parseFloat(acousticness);
    var instrumentalnessVal = parseFloat(instrumentalness);
    var livenessVal = parseFloat(liveness);
    var valenceVal = parseFloat(valence);
    var tempoVal = parseInt(tempo) / 250;
    var time_signatureVal = parseInt(time_signature) / 5;
    var week_posVal = Math.abs(parseInt(week_pos) - 100) / 100;
    var instanceVal = parseInt(instance) / 9;
    var weeks_on_chartVal = parseInt(weeks_on_chart) / 87;

    // List of input values
    var data = [explicitVal, durationVal, popularityVal, danceabilityVal, energyVal, keyVal, loudnessVal, modeVal, speechinessVal, acousticnessVal, instrumentalnessVal, livenessVal, valenceVal, tempoVal, time_signatureVal, week_posVal, instanceVal, weeks_on_chartVal];

    // Create a horizontal bar chart using chart.js
    Chart.defaults.global.defaultFontFamily = "Lato";

    var horizontalBarChart = new Chart(myChart, {
        type: 'horizontalBar',
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

    // string of flask route
    var song_params = `/deepBillboard/song_param=${genre},${explicit},${duration},${popularity},${danceability},${energy},${key},${loudness},${mode},${speechiness},${acousticness},${instrumentalness},${liveness},${valence},${tempo},${time_signature},${week_pos},${instance},${weeks_on_chart}`;

    // Select the <a> child element
    var flaskLinkAnchor = d3.select(".flask-link>a");


    // Button listener
    flaskLinkAnchor.on('click', function(){ 
        d3.event.preventDefault()
        console.log(song_params)


        // grab json output from flask 
        fetch(song_params).then(response => response.json()).then(data => {
           console.log(data)
            
           
           console.log(data.report)

           // parse items from json
           var forecast = data.report;
           var simSongs = data.similar_songs;
           var simArts = data.similar_artists;
           var simPeaks = data.similar_peaks;
           var clusterAvg = data.cluster_avg;
           var selection = data.selection;
           var clusterSize = data.cluster_size;
           var recSongs = ` Songs similar to yours include hits like "${simSongs[selection[0]]}" by ${simArts[selection[0]]}, which reached number ${simPeaks[selection[0]]}, and "${simSongs[selection[1]]}" by ${simArts[selection[1]]}, which made it to ${simPeaks[selection[1]]} on the Billboard Top 100. We found ${clusterSize} tracks with audio parameters similar to yours. On average, these songs reach number ${clusterAvg} on the chart.`;
           var recSongs_short = ` Your song is similar to '${simSongs[selection[0]]}' by ${simArts[selection[0]]} which reached number ${simPeaks[selection[0]]} on the Billboard Top 100. `;
           var blurb = d3.select('.summary')
           blurb.selectAll('P').remove().enter()
           
           // append forecast
           blurb.append('p').text(forecast).attr('class',"text-warning").style("font-family:monospace;font-weight:bold;")

           // append correct blurb for clustering summary
           if (simSongs.length < 2) { 
            blurb.append('p').text(recSongs_short).attr('class',"text-warning").style("font-family:monospace;font-weight:bold;")
           }
           else {blurb.append('p').text(recSongs).attr('class',"text-warning").style("font-family:monospace;font-weight:bold;")}



        
        });
    
        
    
    
    })
}); 