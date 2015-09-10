/**
 * Created by sschrottner on 30.11.2014.
 */
var BrewPhaseService = {

    createBrewPhase: function (day, type, callback) {
        BrewPhases.create({start: new Date(), day: day, type:type}, function (err, phase) {
            BrewPhaseTypes.findOneById(phase.type, function (err, ptype) {
                phase.type = ptype;
                callback(ReturnService.createResult(phase, err));
            })
        })
    }
};

module.exports = BrewPhaseService;
