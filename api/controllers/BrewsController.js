/**
 * BrewsController
 *
 * @description :: Server-side logic for managing Brews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add: function (req, res) {
        var d = new Date();
        Brews.create({name: d.toDateString(), brewStart: d}, function(err, day){
            BrewPhaseService.createBrewPhase(day.id, 18, function (r) {
                return res.json(ReturnService.createResult(day,err))
            })
        })
    },
    start: function (req, res) {
        Brews.update({id: req.param("id")}, {start: new Date()}, function(err, day){
            return res.json(ReturnService.createResult(day,err));
        })

    },
    end: function (req, res) {
        Brews.update({id: req.param("id")}, {stop: new Date()}, function(err, day){
            return res.json(ReturnService.createResult(day,err));
        })
    },

    show: function (req, res) {
        Brews.find({id: req.param("id")}, {stop: new Date()}, function(err, day){
            return res.json(ReturnService.createResult(day,err));
        })
    },

    list: function (req, res) {
        Brews.find(function(err, days){
            return res.json(ReturnService.createResult(days,err));
        })
    }
};

