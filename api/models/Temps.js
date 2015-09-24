/**
* Temps.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    temp: {
      type: 'integer'
    },
    brewTime: {
      type: "datetime"
    },
    sensor: {
      required: true,
      model: "Sensors"
    }
  }
};

