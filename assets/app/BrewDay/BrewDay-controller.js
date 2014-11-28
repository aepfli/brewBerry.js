(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewDayCtrl', BrewDayCtrl)
    .controller('SingleBrewDayCtrl', SingleBrewDayCtrl);

  function BrewDayCtrl($scope, $state, Brewdays, BrewDayDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Brewdays'.toLowerCase());

    $scope.Brewdays = Brewdays;
    $scope.model_def = BrewDayDefinition.originalElement;
    $scope.BrewDay = {};

    $scope.remove = function remove(BrewDay) {
      BrewDay = BrewDay || $scope.BrewDay;
      if (window.confirm('Are you sure you want to delete this BrewDay?')) {
        return resourceService.remove(BrewDay, $scope.Brewdays);
      }
    };

    $scope.save = function save(BrewDay) {
      BrewDay = BrewDay || $scope.BrewDay;
      return resourceService.save(BrewDay, $scope.Brewdays)
        .then(function () {
          $state.go('^.list');
        }, function (err) {
          console.error('An error occured: ' + err);
        });
    };
  }

  function SingleBrewDayCtrl($scope, $stateParams, Brewdays, BrewDayDefinition) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewDay = _.find(Brewdays, {
        id: $stateParams.id
      });
    }
  }

})(
  window.angular,
  window._
);
