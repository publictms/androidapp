'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        factory('Klant', function($http) {

            var Klant = function(data) {
                angular.extend(this, data);
            };

            // a static method to retrieve Klant by ID
            Klant.get = function(id) {
                return $http.get('/Klant/' + id).then(function(response) {
                    return new Klant(response.data);
                });
            };

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

            // an instance method to create a new Klant
            Klant.prototype.create = function() {
                var klant = this;
                return $http.post('/Klant/', klant).then(function(response) {
                    klant.id = response.data.id;
                    return klant;
                });
            };

            return Klant;
        }).
        factory('Bericht', function($http) {

            var Bericht = function(data) {
                angular.extend(this, data);
            };

            Bericht.getAll = function() {
                return $http.get('http://localhost:8084/publictms/bericht/get/1').then(function(response) {
                    var berichten = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        berichten.push(new Bericht(response.data[i]));
                    }
                    return berichten;
                });
            };

            Bericht.prototype.create = function() {
                var bericht = this;
                return $http.post('localhost:8084/publictms/bericht/send/', bericht).then(function(response) {
                    bericht.id = response.data.id;
                    return bericht;
                });
            };

            return Bericht;
        }).
        factory('Voertuig', function($http) {

            var Voertuig = function(data) {
                angular.extend(this, data);
            };

            Voertuig.getAll = function() {
                return $http.get('http://localhost:8084/publictms/voertuig/get').then(function(response) {
                    var voertuigen = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        voertuigen.push(new Voertuig(response.data[i]));
                    }
                    return voertuigen;
                });
            };

            Voertuig.prototype.create = function() {
                var voertuig = this;
                return $http.post('localhost:8084/publictms/voertuig/add', voertuig).then(function(response) {
                    voertuig.id = response.data.id;
                    return voertuig;
                });
            };

            return Voertuig;
        }).
        controller('klantCtrl', function($scope, Klant) {
            $scope.klanten = Klant.getAll;
            $scope.orderProp = 'name';

            $scope.add = function() {
                var klant = new Klant();
                klant.name = 'Test klant';
                klant.create();
            };
        }).
        controller('voertuigCtrl', function($scope, Voertuig) {
            $scope.voertuigen = Voertuig.getAll;
            $scope.orderProp = 'name';

            $scope.add = function() {
                var voertuig = new Voertuig();
                voertuig.name = 'Test voertuig';
                voertuig.create();
            };
        }).
        controller('detailCtrl', function($scope, $routeParams, Data) {
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
        })
        .controller('berichtCtrl', function($scope, Bericht) {
            $scope.berichten = Bericht.getAll;
            $scope.bericht = Bericht.getAll[0];

            $scope.select = function(bericht) {
                $scope.bericht = bericht;
            };

            $scope.answer = function() {

            };

            $scope.send = function() {
                var bericht = new Bericht();
                bericht.BerichtTitel = 'Test nieuw bericht';
                bericht.Bericht = 'We zulle da hier eerst maar is teste';
                bericht.create();
            }
        }).
        controller('planningCtrl', function($scope, Planning) {
            $scope.opdrachten = Planning;
        }).
        controller('CtrlGMap2',
                function CtrlGMap2($scope) {
                    $scope.gmap = {
                        fromAddress: 'thuis',
                        streetAddress: "vlinderstraat",
                        businessWriteup: "test",
                        businessTitle: "test",
                        Lon: 50.924565,
                        Lat: 5.313465
                    };
                });