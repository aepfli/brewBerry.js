/**
* Sensors.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    sysName: {
      type: 'string'
    },
    usage: {
      type: "string"
    },
    running: {type: 'boolean',
      defaultsTo: false,
      required: true
    },
    connected: {type: 'boolean',
      defaultsTo: false,
      required: true
    }
  }
};

