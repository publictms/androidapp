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
        factory('KlantFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/klant/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('KlantenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/klant/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        factory('AdresFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/adres/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('AdressenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/adres/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        factory('ContactFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/contact/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('ContactenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/contact/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        factory('TaalFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/taal/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('TalenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/taal/?CALLBACK=JSONP_CALLBACK', {}, {
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
        // Factory voor de tabel opleggers
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('OpleggerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/oplegger/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('OpleggersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/oplegger/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        factory('TransportFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/transport/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('TransportenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/transport/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // Factory voor de tabel werknemers
        // Parameter: $http (parameters met een $-teken zijn libraries die men kan 'injecten')
        factory('WerknemerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/werknemer/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        factory('WerknemersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/werknemer/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        factory('RijbewijsFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/rijbewijsgegevens/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });
        }).
        factory('RijbewijzenFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/rijbewijsgegevens/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });
        }).
        factory('PersoonsinfoFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/persoonsinfo/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });
        }).
        factory('PersoonsinfosFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/persoonsinfo/?CALLBACK=JSONP_CALLBACK', {}, {
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
        controller('klantCtrl', function($scope, $location, KlantFactory, KlantenFactory) {

            $scope.getList = function() {
                KlantenFactory.all(function(data) {
                    $scope.klanten = data;
                });
            };

            $scope.add = function() {
                $location.path('admin/klanten/nieuw');
            };

            $scope.update = function(klantId) {
                $location.path('admin/klant/' + klantId);
            };

            $scope.delete = function(klantId) {
                KlantFactory.delete({id: klantId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        controller('klantDetailCtrl', function($scope, $routeParams, KlantFactory, KlantenFactory, AdresFactory, ContactFactory, TaalFactory) {
            $scope.state = true;
            $scope.klant = KlantFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                KlantenFactory.update($scope.klant);
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
        controller('klantCreateCtrl', function($scope, $location, $timeout, KlantenFactory, AdressenFactory, ContactenFactory, TalenFactory) {
            $scope.talen = TalenFactory.all();
            $scope.create = function(adres, contact, klant) {
                AdressenFactory.create(adres, function() {
                    ContactenFactory.create(contact, function() {

                    });
                });

            };
        }).
        // Controller om de voertuigen en de functies te koppelen aan de view
        controller('transportCtrl', function($scope, $location, TransportFactory, TransportenFactory) {

            $scope.getList = function() {
                TransportenFactory.all(function(data) {
                    $scope.transporten = data;
                });
            };

            $scope.add = function() {
                $location.path('admin/transporten/nieuw');
            };

            $scope.update = function(transportId) {
                $location.path('admin/transport/' + transportId);
            };

            $scope.delete = function(transportId) {
                TransportFactory.delete({id: transportId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        controller('transportDetailCtrl', function($scope, $routeParams, TransportFactory, TransportenFactory, AdresFactory, ContactFactory, TaalFactory) {
            $scope.state = true;
            $scope.transport = TransportFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                TransportenFactory.update($scope.transport);
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
        controller('transportCreateCtrl', function($scope, $location, $timeout, TransportenFactory) {
            $scope.create = function(transport) {
                TransportenFactory.create(transport, function() {
                    $timeout(function() {
                        $location.path('/admin/transporten');
                    });
                });

            };
        }).
        // Controller om de opleggers en de functies te koppelen aan de view
        controller('opleggerCtrl', function($scope, $location, OpleggerFactory, OpleggersFactory) {

            $scope.getList = function() {
                OpleggersFactory.all(function(data) {
                    $scope.opleggers = data;
                });
            }

            $scope.add = function() {
                $location.path('admin/opleggers/nieuw');
            };

            $scope.update = function(opleggerId) {
                $location.path('admin/oplegger/' + opleggerId);
            };

            $scope.delete = function(opleggerId) {
                OpleggerFactory.delete({id: opleggerId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        controller('opleggerDetailCtrl', function($scope, $routeParams, OpleggerFactory, OpleggersFactory) {
            $scope.state = true;
            $scope.oplegger = OpleggerFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                OpleggersFactory.update($scope.oplegger);
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
        controller('opleggerCreateCtrl', function($scope, $location, OpleggersFactory, data) {
            $scope.create = function(oplegger) {
                //data.setProperty(oplegger);
            };
        }).
        // Controller om de laadgegevens en de functies te koppelen aan de view
        controller('laadgegevensDetailCtrl', function($scope, $routeParams, LaadgegevenFactory, LaadgegevensFactory) {
            $scope.state = true;
            $scope.laadgegeven = LaadgegevenFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                LaadgegevensFactory.update($scope.laadgegeven);
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
        controller('laadGegevensCreateCtrl', function($scope, $location, LaadgegevensFactory, OpleggersFactory, data) {
            //$scope.both = data.getProperty();
            //console.log($scope);
        }).
        controller('werknemerCtrl', function($scope, $location, WerknemersFactory, WerknemerFactory) {

            $scope.getList = function() {
                WerknemersFactory.all(function(data) {
                    $scope.werknemers = data;
                });
            }

            $scope.add = function() {
                $location.path('admin/werknemers/nieuw');
            };

            $scope.delete = function(werknemerId) {
                WerknemerFactory.delete({id: werknemerId}, function() {
                    $scope.getList();
                });
            };
            $scope.getList();
        }).
        controller('werknemerDetailCtrl', function($scope, $routeParams, WerknemerFactory, WerknemersFactory, AdresFactory, ContactFactory, TaalFactory, RijbewijsFactory, PersoonsinfoFactory, AdressenFactory, ContactenFactory, TalenFactory, RijbewijzenFactory, PersoonsinfosFactory) {
            $scope.state = true;
            $scope.werknemer = WerknemerFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.rijbewijsgegevens = RijbewijsFactory.show({id: $routeParams.id});
            $scope.persoonsinfo = PersoonsinfoFactory.show({id: $routeParams.id});
            $scope.buttonedit = false;
            $scope.buttonsave = true;
            $scope.edit = function() {
                $scope.state = false;
                $scope.buttonedit = true;
                $scope.buttonsave = false;
            };
            $scope.save = function() {
                WerknemersFactory.update($scope.werknemer);
                AdressenFactory.update($scope.adres);
                ContactenFactory.update($scope.contact);
                TalenFactory.update($scope.taal);
                RijbewijzenFactory.update($scope.rijbewijsgegevens);
                PersoonsinfosFactory.update($scope.persoonsinfo);
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
        /* controller('werknemerCreateCtrl', function($scope, $location, WerknemerFactory) {
         $scope.voertuig = {"nummerplaat":"","actief":null,"omschrijving":"","voertuigtype":"","bouwjaar":"","datumin":"","datumuit":"","chassisnummer":"","motornummer":"","vergunning":null,"vergunninggeldigtot":"","vrijveld":"","opleggerid":null}
         $scope.create = function() {
         VoertuigenFactory.create($scope.voertuig);
         $location.path('/admin/voertuigen');
         };
         }).*/
        // Controller om de voertuigen en de functies te koppelen aan de view
        controller('berichtCtrl', function($scope, $location, BerichtFactory, GebruikerFactory) {

            $scope.getUser = function(id) {
                var user = GebruikerFactory.show({id: id});
                $scope.user = user;
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

            $scope.select = function(bericht) {
                $scope.bericht = bericht;
            };

            $scope.getList(3);

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