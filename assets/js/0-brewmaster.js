/**
 * Created by sschrottner on 21.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.master = (function(){
    var publicMethods = {
        start: start,
        stop: stop
    };
    function init() {
        brewBerry.services.tempservice.loadSensors();
    }

    function start() {
        brewBerry.services.tempservice.startLogging();

    }

    function stop() {
        brewBerry.services.tempservice.s();

    }


    $(init);
    return publicMethods;
})();