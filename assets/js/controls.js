/**
 * Created by sschrottner on 10.09.2015.
 */
var dataContainer = {
            brewday: null,
            plotbands: [],
            currentPlot: null,
        }
        ;
$(document).ready(function () {
    $('#timer').stopwatch().stopwatch('start');
    $("a").click(function (e) {
        e.preventDefault();
    });

    $("#brewmenu a").click(function (e) {
        e.preventDefault();
        var link = $(this);
        var url = link.attr('href');
        $.getJSON(url, function (data) {
            if (link.data("container") !== undefined) {
                dataContainer[link.data("container")] = data.data;
                onBrewDayLoaded();
            }
        })
    });

    $("#brewcontrol a").click(function (e) {
        e.preventDefault();
        var link = $(this);
        var url = link.attr('href');
        url = url + "&day=";
        url = url+ dataContainer.brewday.id;
        $.getJSON(url, function (t) {
            if (dataContainer.currentPlot) {
                dataContainer.currentPlot.to = new Date();
            }

             var currentPlot = chart2.xAxis[0].addPlotBand({
                from: new Date(t.data.start).getTime(),
                to: Date.UTC(2018, 0, 4),
                color: t.data.type.color,
                id: t.data.id
            });
            console.log(currentPlot)
            dataContainer.plotbands.push(currentPlot);
            dataContainer.currentPlot = currentPlot;


            $('#timer').stopwatch('reset');
        })
    })
});