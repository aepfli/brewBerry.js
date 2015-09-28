/**
 * Created by sschrottner on 13.09.2015.
 */

var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.gauges = (function () {
    var gauges = {};
    var publicMethods = {
        'init' :init,
        'load': load
    };
    var options = {
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
                backgroundColor: '#EEE',
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
                text: 'Celcius'
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

    function load() {

    }

    function init() {
        $("body").append("<section id=gauges class='panel panel-default'>"
                + "<div id=sensors  class='panel-body'></div>"
                + "</section>");
        console.log(brewBerry.services.tempservice);

        load();

        brewBerry.services.temps.onAdded("gauge", onSensorAdded, true);
        brewBerry.services.temps.onTempAdded("gauge", onTempAdded, false);

    }


    function onSensorAdded(data) {
        $("#sensors").append("<div id='temps" + data.id + "' class='gauges'></div>");
        gauges[data.id] = new Highcharts.Chart(Highcharts.merge(options, {
            chart: {
                renderTo: "temps" + data.id + "",
            },
            series: [{
                name: data.id,
                data: [0],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">'+data.name+'</span></div>'
                },
                tooltip: {
                    valueSuffix: ' C'
                }
            }]
        }));
    }

    function onTempAdded(data) {
        var key = data.sensor.id;
        if(brewBerry.brewDay.brewEnd === undefined) {
            gauges[key].series[0].points[0].update(data.temp);
        }
    }


    //$(init);
    return publicMethods;
})();

