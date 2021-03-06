/**
 * This is an advanced demo of setting up Highcharts with the flags feature borrowed from Highstock.
 * It also shows custom graphics drawn in the chart area on chart load.
 */

/**
 * Fires on chart load, called from the chart.events.load option.
 */
var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        title: {
            y: -70
        },
        labels: {
            y: 16
        },
        min: 0,
        max: 100,
        title: {
            text: 'Temp'
        }
    },

    credits: {
        enabled: false
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

var chart2;
var sensors;
function onBrewDayLoaded() {

    console.log("jippi")
    loadBrewPhases();
    //TODO: load sensors
    //TODO: load brewphase
    //TODO: prep stuff :D
    //setInterval if needed!!!
}

function loadSensors() {
    $.getJSON("../sensors/find", function (data) {
        sensors = {};
        for (var i = 0; i < data.length; i++) {
            var key = data[i].id;
            sensors[key] = data[i];

            var options = {
                name: sensors[key].name,
                id: sensors[key].name,
                type: 'line',
                tooltip: {
                    valueSuffix: " C"
                },
                lineWidth: 1
            };
            console.log(options)
            sensors[key].series = chart2.addSeries(options)
            loadSensor(sensors[key])
        }

        io.socket.on('temps', function (obj) {
            if (obj.verb == 'created') {
                var data = obj.data;
                addTemp(data);
            }
        });

    });
}

function loadBrewPhases() {
    console.log("jippi2222")
    $.getJSON("../brewphases/list?day=" + dataContainer.brewday.id, function (data) {
        var phases = data;
        for (var i = 0; i < phases.length; i++) {
            var to = Date.UTC(2018, 0, 4);
            if (phases[i].end) {
                to = new Date(phases[i].end).getTime();
            }
            var options = {
                from: new Date(phases[i].start).getTime(),
                to: Date.UTC(2018, 0, 4),
                color: phases[i].type.color,
                id: phases[i].id
            };
            console.log(options)
            dataContainer.plotbands.push(chart2.xAxis[0].addPlotBand(options));
        }
    });
}

function loadSensor(sensor) {
    var start_date = null;
    $("#temps").append("<div id='temps" + sensor.name + "' class='gauges'></div");
    sensor.gauge = new Highcharts.Chart(Highcharts.merge(gaugeOptions, {
        chart: {
            renderTo: "temps" + sensor.name
        },
        series: [{
            name: sensor.name,
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                '<span style="font-size:12px;color:silver">Celsius</span></div>'
            },
            tooltip: {
                valueSuffix: ' C'
            }
        }]
    }));

    $("#temps"+sensor.name).bind('click', function (e) {
        console.log("clickedi");
        $.getJSON("../sensors/toggleLogging", {sensor: sensor.name}, function (data) {
            console.log(data);
        });
    });
    sensor.lastUpdate = null;
}

function addTemp(temp) {
    var sensor = sensors[temp.sensor];
    sensor.temp = temp.temp;
    if (dataContainer.brewday) {
        var time = new Date(temp.brewTime);
        var shift = sensor.series.data.length > 100;

        sensor.series.addPoint({x: time.getTime(), y: sensor.temp}, true, shift);
    }
    sensor.gauge.series[0].points[0].update(sensor.temp);

}
function loadTemp(sensor) {

    io.socket.get("/temps", {sensor: sensor.id, brewTime: {">": new Date(dataContainer.brewday.brewStart)}}, function (resData) {
        console.log(resData);
    });
}

$(document).ready(function () {

    loadSensors();
    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            defaultSeriesType: 'spline',
        },
        title: {
            text: 'Raspberry Pi Temperature Plot'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 500,
            title: {
                text: 'Time',
                margin: 15
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Temperature \u00B0C',
                margin: 15
            }
        }
    });
});
