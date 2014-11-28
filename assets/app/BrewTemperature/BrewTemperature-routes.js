(function (ng) {

  'use strict';

  ng.module('BrewBerry')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/Brewtemperatures', '/Brewtemperatures/list');

      $stateProvider
        .state('Brewtemperatures', {
          abstract: true,
          url: '/Brewtemperatures',
          controller: 'BrewTemperatureCtrl',
          template: '<div ui-view></div>',
          resolve: {
            BrewTemperatureDefinition: function getBrewTemperatureDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Brewtemperatures');
            },
            Brewtemperatures: function BrewtemperaturesListResolve(Restangular) {
              return Restangular.all('Brewtemperatures').getList();
            }
          },
        })
        .state('Brewtemperatures.list', {
          url: '/list',
          templateUrl: 'app/BrewTemperature/BrewTemperature-list.html'
        })
        .state('Brewtemperatures.add', {
          url: '/add',
          templateUrl: 'app/BrewTemperature/BrewTemperature-add-edit.html'
        })
        .state('Brewtemperatures.info', {
          url: '/info/:id',
          controller: 'SingleBrewTemperatureCtrl',
          templateUrl: 'app/BrewTemperature/BrewTemperature-info.html'
        })
        .state('Brewtemperatures.edit', {
          url: '/edit/:id',
          controller: 'SingleBrewTemperatureCtrl',
          templateUrl: 'app/BrewTemperature/BrewTemperature-add-edit.html'
        });
    });
})(
  window.angular
);
