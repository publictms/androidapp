'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        factory('Data', function() {
            var klanten = [
                {'id': 1, 'name': 'Wout Helsen', 'address': 'Vlinderstraat', 'age': 21},
                {'id': 2, 'name': 'Stijn Ceunen', 'address': 'Geelse baan', 'age': 20},
                {'id': 3, 'name': 'Floris Cuypen', 'address': 'Oude baan', 'age': 22},
                {'id': 4, 'name': 'Laurens Putseys', 'address': 'Kerkstraat', 'age': 30},
                {'id': 5, 'name': 'Anthony Schouterden', 'address': 'Stationstraat', 'age': 21},
                {'id': 6, 'name': 'Tom Degol', 'address': 'Diestersteenweg', 'age': 20},
                {'id': 7, 'name': 'Robby Vanwalleghem', 'address': 'E313', 'age': 20}
            ];
            return klanten;
        }).
        factory('Berichten', function() {
            var berichten = [
                {'id': 1, 'sender': 'wout@pxl.be', 'subject': 'Test1', 'content': 'test berichten 1'},
                {'id': 2, 'sender': 'laurens@pxl.be', 'subject': 'Test2', 'content': 'test berichten 2'},
                {'id': 3, 'sender': 'stijn@pxl.be', 'subject': 'Test3', 'content': 'test berichten 3'},
                {'id': 4, 'sender': 'floris@pxl.be', 'subject': 'Test4', 'content': 'test berichten 4'},
                {'id': 5, 'sender': 'robby@pxl.be', 'subject': 'Test5', 'content': 'test berichten 5'},
                {'id': 6, 'sender': 'wout@pxl.be', 'subject': 'Test6', 'content': 'test berichten 6'},
                {'id': 7, 'sender': 'laurens@pxl.be', 'subject': 'Test7', 'content': 'test berichten 7'},
                {'id': 8, 'sender': 'stijn@pxl.be', 'subject': 'Test8', 'content': 'test berichten 8'},
                {'id': 9, 'sender': 'floris@pxl.be', 'subject': 'Test9', 'content': 'test berichten 9'},
                {'id': 10, 'sender': 'robby@pxl.be', 'subject': 'Test10', 'content': 'test berichten 10'}
            ];
            return berichten;
        }).
        factory('Planning', function() {
            var opdrachten = [
                {'id': 1, 'type': 'laden', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 2, 'type': 'lossen', 'lading': 'televisies', 'klant': 'Mediamarkt', 'adres': 'Hasselt'},
                {'id': 3, 'type': 'laden', 'lading': 'Tafels', 'klant': 'Vanerum', 'adres': 'Diest'},
                {'id': 4, 'type': 'laden', 'lading': 'Chemicaliën', 'klant': 'Chemie', 'adres': 'Tessenderlo'},
                {'id': 5, 'type': 'lossen', 'lading': 'televisies', 'klant': 'PXL', 'adres': 'Hasselt'},
                {'id': 6, 'type': 'laden', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 7, 'type': 'lossen', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 8, 'type': 'lossen', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 9, 'type': 'lossen', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 10, 'type': 'laden', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 11, 'type': 'lossen', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'},
                {'id': 12, 'type': 'laden', 'lading': 'televisies', 'klant': 'Philips', 'adres': 'Eindhoven'}
            ];
            return opdrachten;
        }).
        controller('adminCtrl', function($scope, Data) {
            $scope.klanten = Data;
            $scope.orderProp = 'name';
        }).
        controller('addCtrl', function($scope, Data) {
            $scope.save = function() {
                Data.push({'id': 8, 'name': $scope.name, 'address': $scope.address, 'age': $scope.age});
            }
        })
        .controller('detailCtrl', function($scope, $routeParams, Data) {
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
        .controller('messageCtrl', function($scope, Berichten) {
            $scope.berichten = Berichten;
            $scope.bericht = Berichten[0];
            $scope.select = function(bericht) {
                $scope.bericht = bericht;
            };
            $scope.answer = function() {
                
            };
        }) 
        .controller('newMessageCtrl', function($scope, Berichten) {
            $scope.send = function() {
                Berichten.push({'id': 11, 'sender': 'wout@pxl.be', 'subject': $scope.subject, 'content': $scope.content});
            };
        })
        .controller('planningCtrl', function($scope, Planning) {
            $scope.opdrachten = Planning;
        })
        .controller('navigatieCtrl', function($scope, Berichten) {
            
        }).controller('CtrlGMap2',
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