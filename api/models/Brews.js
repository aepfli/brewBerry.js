/**
* Brews.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    brewStart: {
      type: "datetime"
    },
    brewEnd: {
      type: "datetime"
    },
    name: {
      type: "string"
    },
    malt: {
      type: "string"
    },
    hops: {
      type: "string"
    }
  }
};

