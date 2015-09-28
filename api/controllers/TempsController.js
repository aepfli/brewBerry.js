/**
 * TempsController
 *
 * @description :: Server-side logic for managing temps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    forBrew: function (req, res) {
        Brews.findOne(req.param('brewday'))
                .then(function (brewDay) {
                    return Temps.find({
                        where: {
                            sensor: req.param('sensor'),
                            brewTime: {
                                ">": brewDay.brewStart,
                                "<": brewDay.brewEnd
                            }
                        },
                        limit:0
                    }).populateAll();
                })
                .then(function (temps) {
                    res.json(temps)
                })
    }
};

