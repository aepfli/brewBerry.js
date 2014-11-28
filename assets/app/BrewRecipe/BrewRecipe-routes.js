(function (ng) {

  'use strict';

  ng.module('BrewBerry')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/Brewrecipes', '/Brewrecipes/list');

      $stateProvider
        .state('Brewrecipes', {
          abstract: true,
          url: '/Brewrecipes',
          controller: 'BrewRecipeCtrl',
          template: '<div ui-view></div>',
          resolve: {
            BrewRecipeDefinition: function getBrewRecipeDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Brewrecipes');
            },
            BrewEventDefinition: function getBrewEventDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Brewevents');
            },
            Brewrecipes: function BrewrecipesListResolve(Restangular) {
              return Restangular.all('Brewrecipes').getList();
            }
          }
        })
        .state('Brewrecipes.list', {
          url: '/list',
          templateUrl: 'app/BrewRecipe/BrewRecipe-list.html'
        })
        .state('Brewrecipes.add', {
          url: '/add',
          templateUrl: 'app/BrewRecipe/BrewRecipe-add-edit.html'
        })
        .state('Brewrecipes.addEvent', {
          url: '/addEvent/:id',
          controller: 'SingleBrewRecipeCtrl',
          templateUrl: 'app/BrewRecipe/BrewRecipe-addEvent.html'
        })
        .state('Brewrecipes.info', {
          url: '/info/:id',
          controller: 'SingleBrewRecipeCtrl',
          templateUrl: 'app/BrewRecipe/BrewRecipe-info.html'
        })
        .state('Brewrecipes.edit', {
          url: '/edit/:id',
          controller: 'SingleBrewRecipeCtrl',
          templateUrl: 'app/BrewRecipe/BrewRecipe-add-edit.html'
        });
    });
})(
  window.angular
);
