/**
 * Created by sschrottner on 13.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.graph = (function () {
    var chart = null;
    var publicMethods = {}
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
        chart = new Highcharts.Chart(Highcharts.merge(options, {
            chart: {
                renderTo: "chart",
            }
        }));
        console.log(brewBerry.services.tempservice);
        brewBerry.services.tempservice.listenOnSensorAdded("graph", onSensorAdded, true);
        brewBerry.services.tempservice.listenOnTempAdded("graph", onTempAdded, true);
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
        brewBerry.services.tempservice.sensors[data.id].series = chart.addSeries(options)
    }

    function onTempAdded(data) {
        var key = data.sensor;

        var time = new Date(data.brewTime);
        var shift = brewBerry.services.tempservice.sensors[key].series.data.length > 100;

        brewBerry.services.tempservice.sensors[key].series.addPoint({x: time.getTime(), y: data.temp}, true, shift);
    }

    $(init);
    return publicMethods;
})();

