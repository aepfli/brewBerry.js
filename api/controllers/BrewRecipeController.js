/**
 * BrewRecipeController
 *
 * @description :: Server-side logic for managing Brewrecipes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  definition: function (req, res) {
    res.json(BrewRecipe.definition);
  }

};

