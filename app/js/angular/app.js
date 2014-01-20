'use strict';


// Verklaren app niveau module die afhankelijk is van filters, en diensten
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'ngTouch',
    'ui.calendar'
]).
          constant('uiCalendarConfig', {}).
        config(['$routeProvider', function($routeProvider) {

                // ADMIN
                // alle navigatie voor de pagina's van het administrator gedeelte
                // templateUrl: de file die opgeroepen wordt en ingeladen in de view
                // controller: de controller die de template gebruikt
                $routeProvider.when('/admin', {templateUrl: 'partials/administrator/index.html'});
                $routeProvider.when('/admin/administratie', {templateUrl: 'partials/administrator/administratie.html'});
                $routeProvider.when('/admin/masterdata', {templateUrl: 'partials/administrator/masterdata.html'});
                $routeProvider.when('/admin/klanten', {templateUrl: 'partials/administrator/klanten/klanten.html', controller: 'klantCtrl'});
                $routeProvider.when('/admin/klant/:id/:aid/:cid/:tid', {templateUrl: 'partials/administrator/klanten/detail.html', controller: 'klantDetailCtrl'});
                $routeProvider.when('/admin/klanten/nieuw', {templateUrl: 'partials/administrator/klanten/nieuw.html', controller: 'klantCreateCtrl'});
                $routeProvider.when('/admin/voertuigen', {templateUrl: 'partials/administrator/voertuigen/voertuigen.html', controller: 'voertuigCtrl'});
                $routeProvider.when('/admin/voertuig/:id', {templateUrl: 'partials/administrator/voertuigen/detail.html', controller: 'voertuigDetailCtrl'});
                $routeProvider.when('/admin/voertuigen/nieuw', {templateUrl: 'partials/administrator/voertuigen/nieuw.html', controller: 'voertuigCreateCtrl'});
                $routeProvider.when('/admin/opleggers', {templateUrl: 'partials/administrator/opleggers/opleggers.html', controller: 'opleggerCtrl'});
                $routeProvider.when('/admin/oplegger/:id', {templateUrl: 'partials/administrator/opleggers/detail.html', controller: 'opleggerDetailCtrl'});
                $routeProvider.when('/admin/opleggers/nieuw', {templateUrl: 'partials/administrator/opleggers/nieuw.html', controller: 'opleggerCreateCtrl'});
                $routeProvider.when('/admin/laadgegeven/:id', {templateUrl: 'partials/administrator/opleggers/detailLaadgegevens.html', controller: 'laadgegevensDetailCtrl'});
                $routeProvider.when('/admin/laadgegevens/nieuw', {templateUrl: 'partials/administrator/opleggers/nieuwLaadgegevens.html', controller: 'laadGegevensCreateCtrl'});
                $routeProvider.when('/admin/transporten', {templateUrl: 'partials/administrator/transportadressen/transporten.html', controller: 'transportCtrl'});
                $routeProvider.when('/admin/transport/:id/:aid/:cid/:tid', {templateUrl: 'partials/administrator/transportadressen/detail.html', controller: 'transportDetailCtrl'});
                $routeProvider.when('/admin/transporten/nieuw', {templateUrl: 'partials/administrator/transportadressen/nieuw.html', controller: 'transportCreateCtrl'});
                $routeProvider.when('/admin/werknemers', {templateUrl: 'partials/administrator/werknemers/werknemers.html', controller: 'werknemerCtrl'});
                $routeProvider.when('/admin/werknemer/:id/:aid/:cid/:tid/:rid/:iid', {templateUrl: 'partials/administrator/werknemers/detail.html', controller: 'werknemerDetailCtrl'});
                $routeProvider.when('/admin/werknemers/nieuw', {templateUrl: 'partials/administrator/werknemers/nieuw.html', controller: 'werknemerCreateCtrl'});
                $routeProvider.when('/admin/adminopdracht', {templateUrl: 'partials/administrator/adminopdracht.html'});
                $routeProvider.when('/admin/opdracht', {templateUrl: 'partials/administrator/opdracht/opdracht.html', controller: 'opdrachtCreateCtrl'});
                $routeProvider.when('/admin/opdracht/klant', {templateUrl: 'partials/administrator/opdracht/klantNieuw.html', controller: 'opdrachtCreateCtrl'});
                $routeProvider.when('/admin/opdracht/voertuig', {templateUrl: 'partials/administrator/opdracht/voertuigNieuw.html', controller: 'opdrachtCreateCtrl'});
                $routeProvider.when('/admin/opdracht/werknemer', {templateUrl: 'partials/administrator/opdracht/werknemerNieuw.html', controller: 'opdrachtCreateCtrl'});
                $routeProvider.when('/admin/opdracht/oplegger', {templateUrl: 'partials/administrator/opdracht/opeggerNieuw.html', controller: 'opdrachtCreateCtrl'});
                $routeProvider.when('/admin/planning', {templateUrl: 'partials/administrator/planning.html', controller: 'CalendarCtrl'});
                $routeProvider.when('/admin/berichten', {templateUrl: 'partials/administrator/berichten/berichten.html', controller: 'berichtCtrl'});
                $routeProvider.when('/admin/berichten/nieuw', {templateUrl: 'partials/administrator/berichten/nieuw.html', controller: 'nieuwBerichtCtrl'});

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

            }]);