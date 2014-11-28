(function (ng) {

  'use strict';

  ng.module('BrewBerry')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/Brewdays', '/Brewdays/list');

      $stateProvider
        .state('Brewdays', {
          abstract: true,
          url: '/Brewdays',
          controller: 'BrewDayCtrl',
          template: '<div ui-view></div>',
          resolve: {
            BrewDayDefinition: function getBrewDayDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Brewdays');
            },
            Brewdays: function BrewdaysListResolve(Restangular) {
              return Restangular.all('Brewdays').getList();
            },
            Brewrecipes: function BrewdaysListResolve(Restangular) {
              return Restangular.all('Brewrecipes').getList();
            }
          },
        })
        .state('Brewdays.list', {
          url: '/list',
          templateUrl: 'app/BrewDay/BrewDay-list.html'
        })
        .state('Brewdays.add', {
          url: '/add',
          templateUrl: 'app/BrewDay/BrewDay-add-edit.html'
        })
        .state('Brewdays.info', {
          url: '/info/:id',
          controller: 'SingleBrewDayCtrl',
          templateUrl: 'app/BrewDay/BrewDay-info.html'
        })
        .state('Brewdays.edit', {
          url: '/edit/:id',
          controller: 'SingleBrewDayCtrl',
          templateUrl: 'app/BrewDay/BrewDay-add-edit.html'
        });
    });
})(
  window.angular
);
