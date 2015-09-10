/**
 * Created by sschrottner on 30.11.2014.
 */
var TemperatureChartService = {

    getTemps: function (sensor, options, callback) {
        Brews.findOne({id: options.day}, function (err, day) {
            Sensors.findOneByName(sensor, function (err, s) {
                var temps = Temps.find({
                    where: {
                        sensor: s.id,
                        brewTime: {
                            ">": new Date(day.brewStart)
                        }
                    },
                    sort: "brewTime DESC",
                    limit: 20
                }, function (err, t) {
                    callback(ReturnService.createResult({temps: t, sensor: s}, err));
                })
            })
        });
    },

    getPhases: function (callback, options) {
        // TODO: Add Brew day else there will be to many datasets
    }
};

module.exports = TemperatureChartService;
