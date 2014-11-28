(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewRecipeCtrl', BrewRecipeCtrl)
    .controller('SingleBrewRecipeCtrl', SingleBrewRecipeCtrl);

  function BrewRecipeCtrl($scope, $state, Brewrecipes, BrewRecipeDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Brewrecipes'.toLowerCase());

    $scope.Brewrecipes = Brewrecipes + " -event";
    $scope.model_def = BrewRecipeDefinition.originalElement;
    $scope.BrewRecipe = {};

    $scope.remove = function remove(BrewRecipe) {
      BrewRecipe = BrewRecipe || $scope.BrewRecipe;
      if (window.confirm('Are you sure you want to delete this BrewRecipe?')) {
        return resourceService.remove(BrewRecipe, $scope.Brewrecipes);
      }
    };

    $scope.save = function save(BrewRecipe) {
      BrewRecipe = BrewRecipe || $scope.BrewRecipe;
      return resourceService.save(BrewRecipe, $scope.Brewrecipes)
        .then(function () {
          $state.go('^.list');
        }, function (err) {
          console.error('An error occured: ' + err);
        });
    };
  }

  function SingleBrewRecipeCtrl($scope, $state, $stateParams, Brewrecipes, BrewRecipeDefinition, Brewevents, BrewEventDefinition, Breweventtypes, SailsResourceService) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewRecipe = _.find(Brewrecipes, {
        id: $stateParams.id
      });
    }
    var brewEventsresourceService = new SailsResourceService('Brewevents'.toLowerCase());
    $scope.BrewEvent = {recipe: $scope.BrewRecipe.id};
    $scope.QuickBarBrewEvent = {recipe: $scope.BrewRecipe.id};
    $scope.BrewEvents = Brewevents;
    $scope.BrewRecipes = Brewrecipes;
    $scope.BrewEventTypes = Breweventtypes;
    $scope.BrewEventDefinition = BrewEventDefinition.originalElement;

    $scope.removeEvent = function removeEvent(BrewEvent) {
      if (BrewEvent.id) {
        BrewEvent.id = _.parseInt(BrewEvent.id);
        BrewEvent = _.find(Brewevents, {
          id: BrewEvent.id
        });
        brewEventsresourceService.remove(BrewEvent, $scope.Brewevents)
          .then(function () {
            $state.reload();
          }, function (err) {
            console.error('An error occured: ' + err);
          });
      }
    };

    $scope.addQuickEvent = function addQuickEvent(BrewEvent, EventType) {
      BrewEvent.name = EventType.name;
      BrewEvent.eventType = EventType.id;
      $scope.addEvent(BrewEvent);
    };

    $scope.addEvent = function addEvent(BrewEvent) {
      console.log(BrewEvent);
      if (BrewEvent.id) {
        BrewEvent.id = _.parseInt(BrewEvent.id);
        var BrewEventExists = _.find(Brewevents, {
          id: BrewEvent.id
        });
        BrewEventExists.name = BrewEvent.name;
        BrewEventExists.eventType = BrewEvent.eventType;
        BrewEvent = BrewEventExists;
      } else {

        BrewEvent = BrewEvent || $scope.BrewEvent;
      }

      if (!BrewEvent.start) {
        BrewEvent.start = new Date();
      }
      brewEventsresourceService.save(BrewEvent, $scope.BrewEvents)
        .then(function () {
          $state.reload();
        }, function (err) {
          console.error('An error occured: ' + err);
        });


      console.log(event);

    }
  }


})(
  window.angular,
  window._
);
