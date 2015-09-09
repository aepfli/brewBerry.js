/**
 * BrewController
 *
 * @description :: Server-side logic for managing Brews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `BrewController.index()`
   */
  index: function (req, res) {
    BrewPhaseTypes.find(function(err, types){
      res.view("brew/index", {enums: types});
    })
  }
};

