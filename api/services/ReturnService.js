/**
 * Created by sschrottner on 30.11.2014.
 */
var ReturnService = {

  createResult: function (data, err) {
    var result = {success: true, error: null, data: null};
    if(err) {
      result.success = false;
      result.error = err;
    } else {
      result.data = data;
    }
    return result;
  }
};

module.exports = ReturnService;
