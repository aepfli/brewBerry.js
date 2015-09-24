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
        BrewPhases.create({start: new Date(), day: req.param('day'), type: req.param('type')})
                .then(function (phase) {
                    return BrewPhases.findOneById(phase.id).populate('type')
                })
                .then(function (brewphase) {
                    BrewPhases.publishCreate(brewphase);
                    res.json(brewphase)
                })
    },
    list: function (req, res) {
        console.log(req.allParams())
        BrewPhases.find({day: req.param('day')}).populateAll().exec(function (err, phases) {
            res.json(ReturnService.createResult(phases, err));
        });
    }
};

