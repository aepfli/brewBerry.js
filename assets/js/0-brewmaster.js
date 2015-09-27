/**
 * Created by sschrottner on 21.09.2015.
 */
var brewBerry = brewBerry || {};
brewBerry.brewDay = null;
brewBerry.master = (function () {
    var inited = false;
    var publicMethods = {
        start: start,
        stop: stop
    };

    function init() {
        $("body").append('<nav class="navbar navbar-default">'
                + '<div class="container">'
                + '<div class="navbar-header">'
                + '     <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">'
                + '         <span class="sr-only">Toggle navigation</span>'
                + '         <span class="icon-bar"></span>'
                + '         <span class="icon-bar"></span>'
                + '         <span class="icon-bar"></span>'
                + '     </button>'
                + '     <a class="navbar-brand" href="#">brewBerry.js</a>'
                + '</div>'
                + '<div class="collapse navbar-collapse" id="navbar">'
                + '     <ul class="nav navbar-nav">                '
                + '         <li><a href="/brews/start" class="brewcontrol" id="brewstartfinish">new Brew</a></li>       '
                + '         <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">load Brew <b class="caret"></b></a>'
                + '             <ul class="dropdown-menu" id="brewstoload">'
                + '                 <li><a href="#">Action</a></li>'
                + '                 <li role="separator" class="divider"></li>'
                + '             </ul>'
                + '         </li>'
                + '     </ul>'
                + '</div>'
                + '</div>'
                + '</nav>');

        io.socket.on("brews", onIOEvent);
        io.socket.get("/brews", {sort: "id DESC", limit: 10}, function (data) {

            for (var i in data) {

                console.log(data[i])
                console.log(data[i].brewEnd === undefined)
                if(data[i].brewEnd === undefined) {
                    start(data)
                }
                onBrewAdded(data[i]);
            }

            $('#brewstoload').prepend('<li role="separator" class="divider"></li>')
        });

    }

    function resetClick() {
        $("nav .brewcontrol").unbind();
        if(brewBerry.brewDay && brewBerry.brewDay.brewEnd === undefined){

            $('#brewstartfinish').text("end Brew");
        } else {
            $('#brewstartfinish').text("new Brew");
        }
        $("nav .brewcontrol").click(function (e) {
            e.preventDefault();
            if(brewBerry.brewDay && brewBerry.brewDay.brewEnd === undefined){
                io.socket.get("/brews/finish", stop)
            } else {
                io.socket.get($(this).attr('href'), start)
            }
        });
    }

    function onIOEvent(obj) {
        console.log("what")
        if (obj.verb == 'created') {
            var data = obj.data;
            onBrewAdded(data);
        }
    }

    function onBrewAdded(data) {
        $('#brewstoload').append('<li><a href="/brews/' + data.id + '" class="brewcontrol">' + data.name + '</a></li>')
        resetClick();
    }

    function initModules() {
        for (var services in brewBerry.services) {
            console.log("loAD services " + services)
            brewBerry.services[services].load();
        }

        for (var control in brewBerry.controls) {
            console.log("init controls " + control);
            if (!inited) {
                brewBerry.controls[control].init();
            }
            brewBerry.controls[control].load()
        }
        inited = true;

    }

    function start(data) {
        brewBerry.brewDay = data;
        initModules();

    }

    function stop(data) {
        brewBerry.brewDay = null;
    }

    $(init);
    return publicMethods;
})();