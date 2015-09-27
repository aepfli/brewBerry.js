/**
 * Created by sschrottner on 13.09.2015.
 */

var brewBerry = brewBerry || {};
brewBerry.controls = brewBerry.controls || {}
brewBerry.controls.timer = (function () {
    var gauges = {};var publicMethods = {
        'init' :init,
        'load': load
    };

    function load() {

    }
    function init() {

        $("body").append("<section id=timer>"
                + "<h1>Timer</h1>"
                + "<div id=timerBox></div>"
                + "</section>");
        // add me to event handling machine, still have to figure it out, where this machine will be and how this will work. maybe at the service itself?
    }

    return publicMethods;
})();

