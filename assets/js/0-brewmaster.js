/**
 * Created by sschrottner on 21.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.brewDay = null;
brewBerry.master = (function () {

    var publicMethods = {
        start: start,
        stop: stop
    };

    function init() {
        for (var services in brewBerry.services) {

            console.log("init services "+services)
            brewBerry.services[services].load();
        }
        $("a").click(function (e) {
            e.preventDefault();
        });

        $("#brewmenu a").click(function (e) {
            e.preventDefault();
            var link = $(this);
            var url = link.attr('href');
            io.socket.get(url, function (data) {
                console.log(data)
                    brewBerry.brewDay = data;
                    start();

            })
        });
    }

    function start() {
        for (var control in brewBerry.controls) {
            console.log("init controls "+control)
            brewBerry.controls[control].init();
        }

    }

    function stop() {
        brewBerry.services.tempservice.s();

    }

    $(init);
    return publicMethods;
})();