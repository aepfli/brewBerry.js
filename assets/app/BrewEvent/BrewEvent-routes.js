(function (ng) {

  'use strict';

  ng.module('BrewBerry')
    .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/Brewevents', '/Brewevents/list');

      $stateProvider
        .state('Brewevents', {
          abstract: true,
          url: '/Brewevents',
          controller: 'BrewEventCtrl',
          template: '<div ui-view></div>',
          resolve: {
            BrewEventDefinition: function getBrewEventDefinition(SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('Brewevents');
            },
            Brewevents: function BreweventsListResolve(Restangular) {
              return Restangular.all('Brewevents').getList();
            }
          },
        })
        .state('Brewevents.list', {
          url: '/list',
          templateUrl: 'app/BrewEvent/BrewEvent-list.html'
        })
        .state('Brewevents.add', {
          url: '/add',
          templateUrl: 'app/BrewEvent/BrewEvent-add-edit.html'
        })
        .state('Brewevents.info', {
          url: '/info/:id',
          controller: 'SingleBrewEventCtrl',
          templateUrl: 'app/BrewEvent/BrewEvent-info.html'
        })
        .state('Brewevents.edit', {
          url: '/edit/:id',
          controller: 'SingleBrewEventCtrl',
          templateUrl: 'app/BrewEvent/BrewEvent-add-edit.html'
        });
    });
})(
  window.angular
);
