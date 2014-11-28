/**
 * BrewDay.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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

