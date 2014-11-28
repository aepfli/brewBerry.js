/**
 * BrewTemperature.js
 *
 * @description :: Temperature log
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    temp: {
      type: 'integer'
    },
    date: {
      type: "datetime"
    }
  }
};

