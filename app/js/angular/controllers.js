'use strict';
/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
        // In de factories haalt men de data op van de webservice
        // Deze data kan men later in de controllers opvragen

        // Factory voor de tabel klanten
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('GebruikerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/gebruiker/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('GebruikersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/gebruiker/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // Factory voor de tabel voertuigen
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('VoertuigFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/voertuig/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('VoertuigenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/voertuig/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // Factory voor de tabel voertuigen
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('BerichtFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/bericht/:id?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('BerichtenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/bericht/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // Controller om de voertuigen en de functies te koppelen aan de view
        controller('voertuigCtrl', function($scope, $location, VoertuigFactory, VoertuigenFactory) {

            $scope.getList = function() {
                VoertuigenFactory.all(function(data) {
                    $scope.voertuigen = data;
                });
            };

            $scope.add = function() {
                $location.path('admin/voertuigen/nieuw');
            };

            $scope.update = function(voertuigId) {
                $location.path('admin/voertuig/' + voertuigId);
            };

            $scope.delete = function(voertuigId) {
                VoertuigFactory.delete({id: voertuigId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        controller('detailCtrl', function($scope, $routeParams, VoertuigFactory, VoertuigenFactory) {
            $scope.state = true;
            $scope.voertuig = VoertuigFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                VoertuigenFactory.update($scope.voertuig);
                $scope.state = true;
                $scope.buttonedit = false;
                $scope.buttonsave = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
                $scope.buttonedit = false;
                $scope.buttonsave = true;
            };
        }).
        controller('createCtrl', function($scope, $location, $timeout, VoertuigenFactory) {
            $scope.create = function(voertuig) {
                VoertuigenFactory.create(voertuig, function() {
                    $timeout(function() {
                        $location.path('/admin/voertuigen');
                    });
                });

            };
        }).
        // Controller om de voertuigen en de functies te koppelen aan de view
        controller('berichtCtrl', function($scope, $location, BerichtFactory, GebruikersFactory) {
            
            $scope.getUser = function(){
                GebruikersFactory.all(function(data){
                    $scope.users = data;
                    $scope.user = data[1];
                });
            };
            
            $scope.getList = function(id) {
                BerichtFactory.query({id: id}, (function(data) {
                    $scope.berichten = data;
                    $scope.bericht = data[0];
                }));
            };

            $scope.new = function() {
                $location.path('admin/berichten/nieuw');
            };

            $scope.delete = function(berichtId) {
                BerichtFactory.delete({id: berichtId}, function() {
                    $scope.getList(3);
                });
            };
            
            $scope.select = function(bericht){
                $scope.bericht = bericht;
            };
            
            $scope.getList(3);
            $scope.getUser();

        }).
        controller('nieuwBerichtCtrl', function($scope, $location, $timeout, BerichtenFactory) {
            $scope.datum = new Date();
            $scope.send = function(bericht) {
                BerichtenFactory.create(bericht, function() {
                    $timeout(function() {
                        $location.path('/admin/berichten');
                    });
                });

            };
        }).
        // Controller om de navigatie en de functies te koppelen aan de view
        controller('MapCtrl',
                function MapCtrl($scope) {
                    $scope.gmap = {
                        fromAddress: 'thuis',
                        streetAddress: "vlinderstraat",
                        businessWriteup: "test",
                        businessTitle: "test",
                        Lon: 50.924565,
                        Lat: 5.313465
                    };
                });