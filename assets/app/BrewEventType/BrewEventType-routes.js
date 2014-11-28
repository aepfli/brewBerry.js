(function (ng) {

  'use strict';

  ng.module('BrewBerry')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/Breweventtypes', '/Breweventtypes/list');

      $stateProvider
        .state('Breweventtypes', {
          abstract: true,
          url: '/Breweventtypes',
          controller: 'BrewEventTypeCtrl',
          template: '<div ui-view></div>',
          resolve: {
            BrewEventTypeDefinition: function getBrewEventTypeDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Breweventtypes');
            },
            Breweventtypes: function BreweventtypesListResolve(Restangular) {
              return Restangular.all('Breweventtypes').getList();
            }
          },
        })
        .state('Breweventtypes.list', {
          url: '/list',
          templateUrl: 'app/BrewEventType/BrewEventType-list.html'
        })
        .state('Breweventtypes.add', {
          url: '/add',
          templateUrl: 'app/BrewEventType/BrewEventType-add-edit.html'
        })
        .state('Breweventtypes.info', {
          url: '/info/:id',
          controller: 'SingleBrewEventTypeCtrl',
          templateUrl: 'app/BrewEventType/BrewEventType-info.html'
        })
        .state('Breweventtypes.edit', {
          url: '/edit/:id',
          controller: 'SingleBrewEventTypeCtrl',
          templateUrl: 'app/BrewEventType/BrewEventType-add-edit.html'
        });
    });
})(
  window.angular
);
