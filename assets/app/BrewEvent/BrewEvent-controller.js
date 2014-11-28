(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewEventCtrl', BrewEventCtrl)
    .controller('SingleBrewEventCtrl', SingleBrewEventCtrl);

  function BrewEventCtrl($scope, $state, Brewevents, BrewEventDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Brewevents'.toLowerCase());

    $scope.Brewevents = Brewevents;
    $scope.model_def = BrewEventDefinition.originalElement;
    $scope.BrewEvent = {};

    $scope.remove = function remove(BrewEvent) {
      BrewEvent = BrewEvent || $scope.BrewEvent;
      if (window.confirm('Are you sure you want to delete this BrewEvent?')) {
        return resourceService.remove(BrewEvent, $scope.Brewevents);
      }
    };

    $scope.save = function save(BrewEvent) {
      BrewEvent = BrewEvent || $scope.BrewEvent;
      return resourceService.save(BrewEvent, $scope.Brewevents)
        .then(function () {
          $state.go('^.list');
        }, function (err) {
          console.error('An error occured: ' + err);
        });
    };
  }

  function SingleBrewEventCtrl($scope, $stateParams, Brewevents, BrewEventDefinition) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewEvent = _.find(Brewevents, {
        id: $stateParams.id
      });
    }
  }

})(
  window.angular,
  window._
);
