/**
 * BrewsController
 *
 * @description :: Server-side logic for managing Brews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    finish:function (req, res) {
        Brews.update(req.param("id"), {brewEnd:new Date()})
                .then(function(brew) {
                    TemperatureLoggingService.stop();
                    console.log("brew has ended")
                    res.json(brew);
                })
    },

    start:function (req, res) {
        Brews.create( {brewStart: new Date()})
                .then(function(brew) {
                    TemperatureLoggingService.start()
                    console.log("brew has started")
                    res.json(brew);
                })
    }

};

