'use strict';


// Verklaren app niveau module die afhankelijk is van filters, en diensten
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
        
  //var access = routingConfig.accessLevels;
  
  // ADMIN
  // alle navigatie voor de pagina's van het administrator gedeelte
  // templateUrl: de file die opgeroepen wordt en ingeladen in de view
  // controller: de controller die de template gebruikt
  $routeProvider.when('/admin', {templateUrl: 'partials/administrator/index.html'});
  $routeProvider.when('/admin/administratie', {templateUrl: 'partials/administrator/administratie.html'});
  $routeProvider.when('/admin/masterdata', {templateUrl: 'partials/administrator/masterdata.html'});
  $routeProvider.when('/admin/klanten', {templateUrl: 'partials/administrator/klanten/klanten.html', controller: 'klantCtrl'});
  $routeProvider.when('/admin/klant/:id', {templateUrl: 'partials/administrator/klanten/detail.html', controller: 'klantCtrl'});
  $routeProvider.when('/admin/klanten/nieuw', {templateUrl: 'partials/administrator/klanten/nieuw.html', controller: 'klantCtrl'});
  $routeProvider.when('/admin/voertuigen', {templateUrl: 'partials/administrator/voertuigen/voertuigen.html', controller: 'voertuigCtrl'});
  $routeProvider.when('/admin/voertuig/:id', {templateUrl: 'partials/administrator/voertuigen/detail.html', controller: 'voertuigCtrl'});
  $routeProvider.when('/admin/voertuigen/nieuw', {templateUrl: 'partials/administrator/voertuigen/nieuw.html', controller: 'voertuigCtrl'});
  $routeProvider.when('/admin/adminopdracht', {templateUrl: 'partials/administrator/masterdata.html'});
  $routeProvider.when('/admin/opdracht', {templateUrl: 'partials/administrator/datum.html'});
  $routeProvider.when('/admin/planning', {templateUrl: 'partials/administrator/planning.html', controller: 'planningCtrl'});
  $routeProvider.when('/admin/berichten', {templateUrl: 'partials/administrator/berichten/berichten.html', controller: 'berichtCtrl'});
  $routeProvider.when('/admin/berichten/nieuw', {templateUrl: 'partials/administrator/berichten/nieuw.html', controller: 'berichtCtrl'});
  
  //USER
  // alle navigatie voor de pagina's van het gebruikers gedeelte
  // templateUrl: de file die opgeroepen wordt en ingeladen in de view
  // controller: de controller die de template gebruikt
  $routeProvider.when('/user', {templateUrl: 'partials/user/index.html'});
  $routeProvider.when('/user/planning', {templateUrl: 'partials/user/planning.html', controller: 'planningCtrl'});
  $routeProvider.when('/user/navigatie', {templateUrl: 'partials/user/navigatie.html', controller: 'MapCtrl'});
  $routeProvider.when('/user/berichten', {templateUrl: 'partials/user/berichten.html', controller: 'messageCtrl'});
  $routeProvider.when('/admin/newmessage', {templateUrl: 'partials/user/newMessage.html', controller: 'messageCtrl'});
  $routeProvider.when('/user/opmerkingen', {templateUrl: 'partials/user/opmerkingen.html'});
  
  // Indien een route niet bestaat wordt er terug naar de loginpagina verwezen
  $routeProvider.otherwise({redirectTo: 'login.html'});
  
  /*$locationProvider.html5Mode(true);
  
  $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        }
    });*/
  
}]);/*.run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });

    }]);*/
