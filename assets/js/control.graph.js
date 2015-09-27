/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.graph = (function () {
    var chart = null;
    var currentPlot = null;
    var plotbands = [];
    var series = {};
    var inited = false;
    var publicMethods = {
        'init': init,
        'load': load
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

    function load() {
        for(var i in series) {
            series[i].setData([], true)
        }
        for(var i in plotbands) {
            chart.xAxis[0].removePlotBand(plotbands[i].id);
        }
        plotbands = [];

    }
    function init() {

        $("body").append("<section id=charts>"
                + "<div id=chart></div>"
                + "</section>");
        chart = new Highcharts.Chart(Highcharts.merge(options, {
            chart: {
                renderTo: "chart",
            }
        }));
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
        series[data.id] = chart.addSeries(options)
    }

    function onTempAdded(data) {

        var key = data.sensor.id;

        var time = new Date(data.brewTime);
        var shift = series[key].data.length > 1000;

       series[key].addPoint({x: time.getTime(), y: data.temp}, true, shift);
    }

    function onPhaseAdded(data) {
        if (currentPlot) {
            currentPlot.to = new Date();
        }

        var toDate = data.end;
        if(toDate === undefined){
            toDate = Date.UTC(2018, 0, 4)
        }

        var newPlot = chart.xAxis[0].addPlotBand({
            from: new Date(data.start).getTime(),
            to: toDate,
            color: data.type.color,
            id: data.id
        });
        plotbands.push(newPlot);
        currentPlot = newPlot;
    }

    //$(init);
    return publicMethods;
})();

