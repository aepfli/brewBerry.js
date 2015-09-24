/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  //TODO: do something like TemperatureLoggingService.getAllSensors();
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var eventtypes = ['heating', 'cooling', 'resting', 'purifying', 'cooking'];
  var eventtypecolors = ['#FF7777', '#7777FF', '#777777', '#77ff77', '#FF0000'];
  for( var i = 0; i < eventtypes.length; i++) {
    BrewPhaseTypes.findOrCreate({name:eventtypes[i]}, {color: eventtypecolors[i], name:eventtypes[i]}, function(err, eventtype){
    console.log(err)
    });
  }
  TemperatureLoggingService.intervall();

  cb();
};
