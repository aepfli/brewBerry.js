/**
 * Created by sschrottner on 13.09.2015.
 */

var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.phases = (function () {
    var gauges = {};
    var publicMethods = {
        'init': init,
        'load': load
    };

    function load() {

    }
    function init() {

        $("body").append("<section id=phaseControl>"
                + "<ul id=phases></ul>"
                + "</section>");

        brewBerry.services.phasetypes.onAdded("phases", onAdded, true);
        // add me to event handling machine, still have to figure it out, where this machine will be and how this will work. maybe at the service itself?
    }

    function onAdded(data) {
        $("#phases").append("<li id=phase" + data.id + ">"
                + "<a href='/brewphases/add?type=" + data.id + "'>"
                + "<span style='background: " + data.color + "'>"
                + "&nbsp;&nbsp;&nbsp;&nbsp;"
                + "</span> "
                + data.name
                + "</a>"
                + "</li>");

        $("#phase" + data.id+" a").click(function (e) {
            e.preventDefault();
            var link = $(this);
            var url = link.attr('href');
            url = url + "&day=";
            url = url + brewBerry.brewDay.id;
            io.socket.post(url, function (data) {
                console.log(data)
            })
        });
    }

    return publicMethods;
})();

