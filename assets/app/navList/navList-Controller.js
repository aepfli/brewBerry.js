/**
 * Created by sschrottner on 28.11.2014.
 */
(function (ng, _) {

  'use strict';

  ng.module('BrewBerry').controller('NavListCtrl', NavListCtrl);

  function NavListCtrl($scope, $state, Brewevents, BrewEventDefinition, SailsResourceService) {
    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };
  }
})(
  window.angular,
  window._
);
