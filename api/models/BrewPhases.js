/**
 * Events.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        start: {
            defaultsTo: new Date(),
            type: "datetime"
        },
        end: {
            type: "datetime"
        },
        type: {
            required: true,
            model: 'BrewPhaseTypes'
        },
        day: {
            required: true,
            model: "Brews"
        }
    }
};

