(function (ng, _) {

  'use strict';

  ng.module('BrewBerry')
    .controller('BrewRecipeCtrl', BrewRecipeCtrl)
    .controller('SingleBrewRecipeCtrl', SingleBrewRecipeCtrl);

  function BrewRecipeCtrl($scope, $state, Brewrecipes, BrewRecipeDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('Brewrecipes'.toLowerCase());

    $scope.Brewrecipes = Brewrecipes;
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

  function SingleBrewRecipeCtrl($scope, $stateParams, Brewrecipes, BrewRecipeDefinition, BrewEventDefinition) {
    // coerce string -> int
    $stateParams.id = _.parseInt($stateParams.id);
    if (!_.isNaN($stateParams.id)) {
      $scope.BrewRecipe = _.find(Brewrecipes, {
        id: $stateParams.id
      });
    }
    $scope.BrewEvent = {};
    $scope.BrewEventDefinition = BrewEventDefinition.originalElement;

    $scope.addEvent = function (BrewRecipe, BrewEvent) {
      console.log("--> Submitting form");
      console.log(BrewEvent);
      console.log(BrewRecipe.name);
      BrewEventDefinition.create(BrewEvent);
    }
  }


})(
  window.angular,
  window._
);
