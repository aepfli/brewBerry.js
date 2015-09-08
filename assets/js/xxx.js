var chart; // global chart variable

function getData() {
    var start_date = null;
    $.getJSON('./getTemps?sensor=' + sensor + '&start_date=' + start_date, function (data) {
        //alert(data.unix_time);
        // Create the series
        var series = chart.series[0]
        // Add the point
        chart.series[0].addPoint([data.data[0].brewTime, data.data[0].temp], true, false);
        // Repeat this function call after 1 second
        start_date = new Date();
        setTimeout(getData, 500);
    });
}
// Configure the plot
$(document).ready(function () {

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline',
            events: {
                load: getData
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
                text: 'Time (sensor called at one second intervals)',
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
        },
        series: [{
            name: 'DS18B20 sensor (\u00B10.5\u00B0C)',
            data: []
        }]
    });
});