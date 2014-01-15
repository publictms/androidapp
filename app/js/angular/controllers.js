'use strict';
/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
        // In de factories haalt men de data op van de webservice
        // Deze data kan men later in de controllers opvragen

        // Factory voor de tabel klanten
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('Klant', function($http) {

            // Klasse klant om data te manipuleren
            // Parameter: data
            var Klant = function(data) {
                angular.extend(this, data);
            };

            // Methode om een klant op te vragen
            // Parameter: id
            Klant.get = function(id) {
                return $http.get('/Klant/' + id).then(function(response) {
                    return new Klant(response.data);
                });
            };

            // Methode om alle klanten op te vragen
            Klant.getAll = function() {
                return $http.get('/Klant').then(function(response) {
                    var klanten = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        klanten.push(new Klant(response.data[i]));
                    }
                    return klanten;
                });
            };

            // Methode om een nieuwe klant toe te voegen
            Klant.prototype.create = function() {
                var klant = this;
                return $http.post('/Klant/', klant).then(function(response) {
                    klant.id = response.data.id;
                    return klant;
                });
            };

            return Klant;
        }).
        // Factory voor de tabel berichten
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('Bericht', function($http) {

            // Klasse bericht om data te manipuleren
            // Parameter: data
            var Bericht = function(data) {
                angular.extend(this, data);
            };

            // Methode om alle berichten op te vragen
            Bericht.getAll = function() {
                return $http.get('http://localhost:8084/publictms/bericht').then(function(response) {
                    var berichten = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        berichten.push(new Bericht(response.data[i]));
                    }
                    return berichten;
                });
            };

            // Methode om een nieuw bericht te verzenden
            Bericht.prototype.create = function() {
                var bericht = this;
                return $http.post('localhost:8084/publictms/bericht/send/', bericht).then(function(response) {
                    bericht.id = response.data.id;
                    return bericht;
                });
            };

            return Bericht;
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
                update: {method: 'PUT'}
            });

        }).
        // Controller om de klanten en de functies te koppelen aan de view
        controller('klantCtrl', function($scope, Klant) {
            $scope.klanten = Klant.getAll;
            $scope.orderProp = 'name';

            // Een klant toevoegen
            $scope.add = function() {
                var klant = new Klant();
                klant.name = 'Test klant';
                klant.create();
            };
        }).
        // Controller om de voertuigen en de functies te koppelen aan de view
        controller('voertuigCtrl', function($scope, $location, VoertuigFactory, VoertuigenFactory) {
            $scope.voertuigen = VoertuigenFactory.all();
            
            $scope.add = function() {
                $location.path('admin/voertuigen/nieuw');
            };

            $scope.update = function(voertuigId) {
                $location.path('admin/voertuig/' + voertuigId);
            };

            $scope.delete = function(voertuigId) {
                var delVoertuig = $scope.voertuigen[voertuigId];
                VoertuigFactory.delete({id: voertuigId});
                $scope.voertuigen = $scope.voertuigen.splice(delVoertuig);
            };

        }).
        controller('detailCtrl', function($scope, $routeParams, VoertuigFactory) {
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
                VoertuigFactory.save($scope.voertuig);
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
        controller('createCtrl', function($scope, $location, VoertuigenFactory) {
            //var voertuig = {"nummerplaat":"abc-123","actief":true,"omschrijving":"mercedes","voertuigtype":"lichtevracht","bouwjaar":"2013/05","datumin":"2013-06-08","datumuit":"2019-08-02","chassisnummer":"WDB1vghvgv31j082409","motornummer":"6805","vergunning":true,"vergunninggeldigtot":"2018-08-25","vrijveld":"dit is een test","opleggerid":1};
            $scope.create = function() {
                VoertuigenFactory.create($scope.voertuig);
                $location.path('/admin/voertuigen');
            };
        }).
        // Controller om de berichten en de functies te koppelen aan de view
        controller('berichtCtrl', function($scope, Bericht) {
            $scope.berichten = Bericht.getAll();
            $scope.bericht = Bericht.getAll();

            // Een bericht selecteren
            $scope.select = function(bericht) {
                $scope.bericht = bericht;
            };

            // Een bericht beantwoorden
            $scope.answer = function() {

            };

            // Een bericht verzenden
            $scope.send = function() {
                var bericht = new Bericht();
                bericht.BerichtTitel = 'Test nieuw bericht';
                bericht.Bericht = 'We zulle da hier eerst maar is teste';
                bericht.create();
            }
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