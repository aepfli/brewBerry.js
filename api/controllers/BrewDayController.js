/**
 * BrewDayController
 *
 * @description :: Server-side logic for managing Brewdays
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(BrewDay.definition);
  }

};

