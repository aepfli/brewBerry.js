/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `EventsController.add()`
     */
    add: function (req, res) {
        BrewPhaseService.createBrewPhase(req.param("day"), req.param("type"), function (r) {
            return res.json(r);
        })
    },
    list: function (req, res) {
        console.log(req.allParams())
        BrewPhases.find({day:req.param('day')}).populateAll().exec(function(err, phases){
            res.json(ReturnService.createResult(phases,err));
        });
    }
};

