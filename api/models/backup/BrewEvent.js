/**
 * BrewEvent.js
 *
 * @description :: An Event occuring during the brew process: basically it can be a timebased, temperaturebased, or just a info for adding ingridients
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      defaultsTo: 'brewevent'
    },
    start: {
      type: 'datetime'
    },
    end: {
      type: 'datetime'
    },
    eventType: {
      type: "string",
      enums: ['HEAT', 'ADD', 'REST', 'PURIFY']
    },
    temps: {
      set: 'BrewTemperature'
    }
  }
};

