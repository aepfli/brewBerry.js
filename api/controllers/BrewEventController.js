/**
 * BrewEventController
 *
 * @description :: Server-side logic for managing Brewevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(BrewEvent.definition);
  }

};

