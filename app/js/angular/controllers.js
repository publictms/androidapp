'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
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
        factory('Voertuig', function($http) {
            
            // Klasse voertuig om data te manipuleren
            // Parameter: data
            var Voertuig = function(data) {
                angular.extend(this, data);
            };

            // Methode om alle voertuigen op te vragen
            Voertuig.getAll = function() {
                return $http.get('http://localhost:8084/publictms/voertuig/').then(function(response) {
                    var voertuigen = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        voertuigen.push(new Voertuig(response.data[i]));
                    }
                    return voertuigen;
                });
            };

            // Methode om een voertuig op te vragen
            // Parameter: id
            Voertuig.get = function(id) {
                return $http.get('http://localhost:8084/publictms/voertuig/get/' + id).then(function(response) {
                    return new Voertuig(response.data);
                });
            };

            // Methode om een nieuw voertuig toe te voegen
            Voertuig.prototype.create = function() {
                var voertuig = this;
                return $http.post('localhost:8084/publictms/voertuig/add', voertuig).then(function(response) {
                    voertuig.id = response.data.id;
                    return voertuig;
                });
            };

            return Voertuig;
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
        controller('voertuigCtrl', function($scope, Voertuig) {
            
            $scope.voertuigen = Voertuig.getAll();

            /*$scope.add = function() {
             var voertuig = new Voertuig();
             voertuig.name = 'Test voertuig';
             voertuig.create();
             };*/
        }).
        /*controller('detailCtrl', function($scope, $routeParams, Data) {
            var klanten = Data;
            $scope.state = true;
            $scope.klant = klanten[$routeParams.id - 1];
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                $scope.state = true;
                $scope.buttonedit = false;
                $scope.buttonsave = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
                $scope.buttonedit = false;
                $scope.buttonsave = true;
            };
        }).*/
        
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