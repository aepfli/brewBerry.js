/**
 * Created by sschrottner on 30.11.2014.
 */
var TemperatureChartService = {

  getTemps: function (sensor, options, callback) {
    console.log("getTemps")
    console.log(options)
    var start_date = '1970-01-01T00:00:00.000Z';
    if (options.start_date && options.start_date != 'null') {
      start_date = options.start_date;
    }

    Sensors.findOneByName(sensor, function (err, s) {
      console.log(err)
      var temps = Temps.find({
        where: {
          sensor: s.id,
          brewTime: {
            ">": new Date(start_date)
          }
        },
        sort: "brewTime DESC",
        limit: 20
      }, function (err, t) {
        console.log(t)
        callback(ReturnService.createResult({temps:t,sensor:s}, err));
      })
    })
  }
};

module.exports = TemperatureChartService;
