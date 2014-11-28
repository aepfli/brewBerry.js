/**
 * Recipe.js
 *
 * @description :: Representing recipes to brew a beer, this is a genereal information how it should be.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      defaultsTo: 'recipe'
    },
    hops: {
      type: 'string',
      defaultsTo: 'recipe'
    },
    yeast: {
      type: 'string',
      defaultsTo: 'yeast'
    },
    instructions: {
      set: "BrewEvent"
    }
  }
};

