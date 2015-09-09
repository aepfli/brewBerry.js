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
function onChartLoad() {
    //TODO: load sensors
    //TODO: load brewphase
    //TODO: prep stuff :D
    //setInterval if needed!!!
    loadSensors();
}

function loadSensors() {
    $.getJSON("../sensors/all", function (data) {
        sensors = data.data;
        for (var i = 0; i < sensors.length; i++) {
            var options = {
                name: sensors[i].name,
                id: sensors[i].name,
                type: 'area',
                tooltip: {
                    valueSuffix: " C"
                }
            };
            console.log(options)
            sensors[i].series = chart2.addSeries(options)
            loadSensor(sensors[i])
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
                valueSuffix: ' km/h'
            }
        }]
    }));
    sensor.lastUpdate = null;
    setInterval(loadTemp, 2000, sensor);
}

function loadTemp(sensor) {
    $.getJSON('./sensors/getTemps?sensor=' + sensor.name, function (data) {
        if (data.data.temps.length > 0) {
            if(data.data.sensor.running) {
                sensor.temp = data.data.temps[0].temp;
            }else {
                sensor.temp = null;
            }
            sensor.lastUpdate = new Date();

            var time = new Date(data.data.temps[0].brewTime);
            var shift = sensor.series.data.length > 100;

            sensor.series.addPoint({x: time.getTime(), y: sensor.temp}, true, shift);
            sensor.gauge.series[0].points[0].update(sensor.temp);

        }

    });
}

function loadBrewPhases() {
    $.getJSON();
}
$(document).ready(function () {

    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart',
            defaultSeriesType: 'spline',
            events: {
                load: onChartLoad
            }
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
