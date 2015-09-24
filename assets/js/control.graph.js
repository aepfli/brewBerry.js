/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.graph = (function () {
    var chart = null;
    var currentPlot = null;
    var plotbands = [];
    var publicMethods = {
        'init': init
    };
    var options = {
        chart: {
            defaultSeriesType: 'spline',
        },
        title: {
            text: 'BREWBERRY'
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
    };

    function init() {

        $("body").append("<section id=charts>"
                + "<h1>chart</h1>"
                + "<div id=chart></div>"
                + "</section>");
        chart = new Highcharts.Chart(Highcharts.merge(options, {
            chart: {
                renderTo: "chart",
            }
        }));
        console.log(brewBerry.services.tempservice);
        brewBerry.services.temps.onAdded("graph", onSensorAdded, true);
        brewBerry.services.temps.onTempAdded("graph", onTempAdded, true);
        brewBerry.services.phase.onAdded("graph", onPhaseAdded, true);
        // add me to event handling machine, still have to figure it out, where this machine will be and how this will work. maybe at the service itself?
    }

    function onSensorAdded(data) {
        var options = {
            name: data.name,
            id: data.name,
            type: 'line',
            tooltip: {
                valueSuffix: " C"
            },
            lineWidth: 1
        };
        console.log(options)
        brewBerry.services.temps.sensors[data.id].series = chart.addSeries(options)
    }

    function onTempAdded(data) {
        var key = data.sensor;

        var time = new Date(data.brewTime);
        var shift = brewBerry.services.temps.sensors[key].series.data.length > 100;

        brewBerry.services.temps.sensors[key].series.addPoint({x: time.getTime(), y: data.temp}, true, shift);
    }

    function onPhaseAdded(data) {
        if (currentPlot) {
            currentPlot.to = new Date();
        }

        var newPlot = chart.xAxis[0].addPlotBand({
            from: new Date(data.start).getTime(),
            to: Date.UTC(2018, 0, 4),
            color: data.type.color,
            id: data.id
        });
        console.log(currentPlot)
        plotbands.push(newPlot);
        currentPlot = newPlot;
    }

    //$(init);
    return publicMethods;
})();

