(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewTemperatureCtrl', BrewTemperatureCtrl)
    .controller('SingleBrewTemperatureCtrl', SingleBrewTemperatureCtrl);

  function BrewTemperatureCtrl($scope, $state, Brewtemperatures, BrewTemperatureDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Brewtemperatures'.toLowerCase());

    $scope.Brewtemperatures = Brewtemperatures;
    $scope.model_def = BrewTemperatureDefinition.originalElement;
    $scope.BrewTemperature = {};

    $scope.remove = function remove(BrewTemperature) {
      BrewTemperature = BrewTemperature || $scope.BrewTemperature;
      if (window.confirm('Are you sure you want to delete this BrewTemperature?')) {
        return resourceService.remove(BrewTemperature, $scope.Brewtemperatures);
      }
    };

    $scope.save = function save(BrewTemperature) {
      BrewTemperature = BrewTemperature || $scope.BrewTemperature;
      return resourceService.save(BrewTemperature, $scope.Brewtemperatures)
        .then(function () {
          $state.go('^.list');
        }, function (err) {
          console.error('An error occured: ' + err);
        });
    };
  }

  function SingleBrewTemperatureCtrl($scope, $stateParams, Brewtemperatures, BrewTemperatureDefinition) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewTemperature = _.find(Brewtemperatures, {
        id: $stateParams.id
      });
    }
  }

})(
  window.angular,
  window._
);
