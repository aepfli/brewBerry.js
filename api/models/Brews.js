/**
* Brews.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    brewStart: {
      type: "datetime",
      defaultsTo: new Date()
    },
    brewEnd: {
      type: "datetime"
    },
    name: {
      type: "string",
      defaultsTo: "gamsbräu"
    },
    malt: {
      type: "string"
    },
    hops: {
      type: "string"
    }
  }
};

