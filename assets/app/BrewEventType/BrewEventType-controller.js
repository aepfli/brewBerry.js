(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewEventTypeCtrl', BrewEventTypeCtrl)
    .controller('SingleBrewEventTypeCtrl', SingleBrewEventTypeCtrl);

  function BrewEventTypeCtrl($scope, $state, Breweventtypes, BrewEventTypeDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Breweventtypes'.toLowerCase());

    $scope.Breweventtypes = Breweventtypes;
    $scope.model_def = BrewEventTypeDefinition.originalElement;
    $scope.BrewEventType = {};

    $scope.remove = function remove(BrewEventType) {
      BrewEventType = BrewEventType || $scope.BrewEventType;
      if (window.confirm('Are you sure you want to delete this BrewEventType?')) {
        return resourceService.remove(BrewEventType, $scope.Breweventtypes);
      }
    };

    $scope.save = function save(BrewEventType) {
      BrewEventType = BrewEventType || $scope.BrewEventType;
      return resourceService.save(BrewEventType, $scope.Breweventtypes)
        .then(function () {
          $state.go('^.list');
        }, function (err) {
          console.error('An error occured: ' + err);
        });
    };
  }

  function SingleBrewEventTypeCtrl($scope, $stateParams, Breweventtypes, BrewEventTypeDefinition) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewEventType = _.find(Breweventtypes, {
        id: $stateParams.id
      });
    }
  }

})(
  window.angular,
  window._
);
