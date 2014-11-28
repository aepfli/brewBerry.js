/**
 * BrewDay.js
 *
 * @description :: Representing an actual day when you brew
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    brewName: {
      type: 'string',
      defaultsTo: 'Brautag'
    },
    info: {
      type: 'string',
      defaultsTo: 'n.a.'
    },
    brewDate: {
      type: 'date'
    },
    recipe: {
      model: 'Recipe',
      defaultsTo: 'null'
    },
    events: {
      collection: 'BrewEvent'
    }
  }
};

