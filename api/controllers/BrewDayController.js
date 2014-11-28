/**
 * BrewDayController
 *
 * @description :: Server-side logic for managing brewdays
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  /**
   * `BrewDayController.create()`
   */
  create: function (req, res) {
    return res.view("");
  },


  /**
   * `BrewDayController.read()`
   */
  read: function (req, res) {
    return res.json({
      todo: 'read() is not implemented yet!'
    });
  },


  /**
   * `BrewDayController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `BrewDayController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

