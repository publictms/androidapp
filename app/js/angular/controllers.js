'use strict';
/* Controllers */

angular.module('myApp.controllers', ['ngResource']).
        // In de factories haalt men de data op van de webservice
        // Deze data kan men later in de controllers opvragen

        // KLANTEN
        // FACTORY
        // Factory voor de tabel klant
        // In deze factory kan men een klant ophalen of verwijderen
        factory('KlantFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/klant/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle klanten ophalen, wijzigen of een nieuwe toevoegen
        factory('KlantenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/klant/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de klanten te tonen en om een klant te verwijderen
        controller('klantCtrl', function($scope, $location, KlantFactory, KlantenFactory) {

            // Haal de lijst van klanten op
            $scope.getList = function() {
                KlantenFactory.all(function(data) {
                    $scope.klanten = data;
                });
            };

            // Navigeer naar een nieuwe klant aanmaken
            $scope.add = function() {
                $location.path('admin/klanten/nieuw');
            };

            // Navigeer naar de details van een klant
            $scope.update = function(klantId) {
                $location.path('admin/klant/' + klantId);
            };

            // Verwijder een klant
            $scope.delete = function(klantId) {
                KlantFactory.delete({id: klantId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        // Controller om de details van een klant te tonen en te wijzigen
        controller('klantDetailCtrl', function($scope, $routeParams, KlantFactory, KlantenFactory, AdresFactory, ContactFactory, TaalFactory, TalenFactory) {
            $scope.state = true;
            $scope.klant = KlantFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.talen = TalenFactory.all();
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                KlantenFactory.update($scope.klant);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuwe klant toe te voegen
        controller('klantCreateCtrl', function($scope, $location, $timeout, KlantenFactory, AdressenFactory, ContactenFactory, TalenFactory) {
            $scope.talen = TalenFactory.all();
            $scope.create = function(adres, contact, klant) {
                AdressenFactory.create(adres, function() {
                    ContactenFactory.create(contact, function() {
                        KlantenFactory.create(klant, function() {

                        })
                    });
                });
            };
        }).
        // TRANSPORTADRESSEN
        // FACTORY
        // Factory voor de tabel transportadres
        // In deze factory kan men een transportadres ophalen of verwijderen
        factory('TransportFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/transport/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle transportadressen ophalen, wijzigen of een nieuwe toevoegen
        factory('TransportenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/transport/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de transportadressen te tonen en om een transportadres te verwijderen
        controller('transportCtrl', function($scope, $location, TransportFactory, TransportenFactory) {

            // Haal de lijst van transportadressen op
            $scope.getList = function() {
                TransportenFactory.all(function(data) {
                    $scope.transporten = data;
                });
            };

            // Navigeer naar een nieuw transportadres aanmaken
            $scope.add = function() {
                $location.path('admin/transporten/nieuw');
            };

            // Navigeer naar de details van een transportadres
            $scope.update = function(transportId) {
                $location.path('admin/transport/' + transportId);
            };

            // Verwijder een transportadres
            $scope.delete = function(transportId) {
                TransportFactory.delete({id: transportId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        // Controller om de details van een transportadres te tonen en te wijzigen
        controller('transportDetailCtrl', function($scope, $routeParams, TransportFactory, TransportenFactory, AdresFactory, ContactFactory, TaalFactory) {
            $scope.state = true;
            $scope.transport = TransportFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                TransportenFactory.update($scope.transport);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuw transportadres toe te voegen
        controller('transportCreateCtrl', function($scope, $location, $timeout, TransportenFactory) {
            $scope.create = function(transport) {
                TransportenFactory.create(transport, function() {
                    $timeout(function() {
                        $location.path('/admin/transporten');
                    });
                });
            };
        }).
        // VOERTUIGEN
        // FACTORY
        // Factory voor de tabel voertuig
        // In deze factory kan men een voertuig ophalen of verwijderen
        factory('VoertuigFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/voertuig/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle voertuigen ophalen, wijzigen of een nieuwe toevoegen
        factory('VoertuigenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/voertuig/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de voertuigen te tonen en om een voertuig te verwijderen
        controller('voertuigCtrl', function($scope, $location, VoertuigFactory, VoertuigenFactory) {

            // Haal de lijst van voertuigen op
            $scope.getList = function() {
                VoertuigenFactory.all(function(data) {
                    $scope.voertuigen = data;
                });
            };

            // Navigeer naar een nieuw voertuig aanmaken
            $scope.add = function() {
                $location.path('admin/voertuigen/nieuw');
            };

            // Navigeer naar de details van een voertuig
            $scope.update = function(voertuigId) {
                $location.path('admin/voertuig/' + voertuigId);
            };

            // Verwijder een voertuig
            $scope.delete = function(voertuigId) {
                VoertuigFactory.delete({id: voertuigId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        // Controller om de details van een voertuig te tonen en te wijzigen
        controller('voertuigDetailCtrl', function($scope, $routeParams, VoertuigFactory, VoertuigenFactory) {
            $scope.state = true;
            $scope.voertuig = VoertuigFactory.show({id: $routeParams.id});
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                VoertuigenFactory.update($scope.voertuig);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuw voertuig toe te voegen
        controller('voertuigCreateCtrl', function($scope, $location, $timeout, VoertuigenFactory) {
            $scope.create = function(voertuig) {
                VoertuigenFactory.create(voertuig, function() {
                    $timeout(function() {
                        $location.path('/admin/voertuigen');
                    });
                });
            };
        }).
        // OPLEGGERS
        // FACTORY
        // Factory voor de tabel oplegger
        // In deze factory kan men een oplegger ophalen of verwijderen
        factory('OpleggerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/oplegger/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle opleggers ophalen, wijzigen of een nieuwe toevoegen
        factory('OpleggersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/oplegger/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de opleggers te tonen en om een oplegger te verwijderen
        controller('opleggerCtrl', function($scope, $location, OpleggerFactory, OpleggersFactory) {

            // Haal de lijst van opleggers op
            $scope.getList = function() {
                OpleggersFactory.all(function(data) {
                    $scope.opleggers = data;
                });
            };

            // Navigeer naar een nieuwe oplegger aanmaken
            $scope.add = function() {
                $location.path('admin/opleggers/nieuw');
            };

            // Navigeer naar de details van een oplegger
            $scope.update = function(opleggerId) {
                $location.path('admin/oplegger/' + opleggerId);
            };

            // Verwijder een oplegger
            $scope.delete = function(opleggerId) {
                OpleggerFactory.delete({id: opleggerId}, function() {
                    $scope.getList();
                });
            };

            $scope.getList();

        }).
        // Controller om de details van een oplegger te tonen en te wijzigen
        controller('opleggerDetailCtrl', function($scope, $routeParams, OpleggerFactory, OpleggersFactory) {
            $scope.state = true;
            $scope.oplegger = OpleggerFactory.show({id: $routeParams.id});
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                OpleggersFactory.update($scope.oplegger);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuwe oplegger toe te voegen
        controller('opleggerCreateCtrl', function($scope, $location, OpleggersFactory, data) {
            $scope.create = function(oplegger) {
                OpleggersFactory.create(oplegger, function() {
                    $timeout(function() {
                        $location.path('/admin/opleggers');
                    });
                });
            };
        }).
        // WERKNEMERS
        // FACTORY
        // Factory voor de tabel werknemer
        // In deze factory kan men een werknemer ophalen of verwijderen
        factory('WerknemerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/werknemer/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle werknemers ophalen, wijzigen of een nieuwe toevoegen
        factory('WerknemersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/werknemer/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de werknemers te tonen en om een werknemer te verwijderen
        controller('werknemerCtrl', function($scope, $location, WerknemersFactory, WerknemerFactory) {

            // Haal de lijst van werknemers op
            $scope.getList = function() {
                WerknemersFactory.all(function(data) {
                    $scope.werknemers = data;
                });
            };

            // Navigeer naar een nieuwe werknemer aanmaken
            $scope.add = function() {
                $location.path('admin/werknemers/nieuw');
            };

            // Navigeer naar de details van een werknemer
            $scope.update = function(werknemerId) {
                $location.path('admin/werknemer/' + werknemerId);
            };

            // Verwijder een werknemer
            $scope.delete = function(werknemerId) {
                WerknemerFactory.delete({id: werknemerId}, function() {
                    $scope.getList();
                });
            };
            $scope.getList();
        }).
        // Controller om de details van een werknemer te tonen en te wijzigen
        controller('werknemerDetailCtrl', function($scope, $routeParams, WerknemerFactory, WerknemersFactory, AdresFactory, ContactFactory, TaalFactory, RijbewijsFactory, PersoonsinfoFactory, AdressenFactory, ContactenFactory, TalenFactory, RijbewijzenFactory, PersoonsinfosFactory) {
            $scope.state = true;
            $scope.werknemer = WerknemerFactory.show({id: $routeParams.id});
            $scope.adres = AdresFactory.show({id: $routeParams.id});
            $scope.contact = ContactFactory.show({id: $routeParams.id});
            $scope.taal = TaalFactory.show({id: $routeParams.id});
            $scope.rijbewijsgegevens = RijbewijsFactory.show({id: $routeParams.id});
            $scope.persoonsinfo = PersoonsinfoFactory.show({id: $routeParams.id});
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                WerknemersFactory.update($scope.werknemer);
                AdressenFactory.update($scope.adres);
                ContactenFactory.update($scope.contact);
                TalenFactory.update($scope.taal);
                RijbewijzenFactory.update($scope.rijbewijsgegevens);
                PersoonsinfosFactory.update($scope.persoonsinfo);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuwe werknemers toe te voegen
        controller('werknemerCreateCtrl', function($scope, $location, WerknemersFactory) {
            $scope.create = function(werknemer) {
                WerknemersFactory.create(werknemer, function() {
                    $timeout(function() {
                        $location.path('/admin/werknemers');
                    });
                });
            };
        }).
        // LAADGEGEVENS
        // FACTORY
        // Factory voor de tabel laadgegevens
        // In deze factory kan men een laadgegeven ophalen of verwijderen
        factory('LaadgegevenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/laadgegevens/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle laadgegevens ophalen, wijzigen of een nieuwe toevoegen
        factory('LaadgegevensFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/laadgegevens/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de details van een laadgegeven te tonen en te wijzigen
        controller('laadgegevensDetailCtrl', function($scope, $routeParams, LaadgegevenFactory, LaadgegevensFactory) {
            $scope.state = true;
            $scope.laadgegeven = LaadgegevenFactory.show({id: $routeParams.id});
            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                LaadgegevensFactory.update($scope.laadgegeven);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        controller('laadGegevensCreateCtrl', function($scope, $location, LaadgegevensFactory, OpleggersFactory, data) {
            //$scope.both = data.getProperty();
            //console.log($scope);
        }).
        // OPDRACHTEN
        // FACTORY
        // Factory voor de tabel opdracht
        // In deze factory kan men een opdracht ophalen, op gedaan zetten of verwijderen
        factory('OpdrachtFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/opdracht/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                ready: {method: 'GET', params: {id: '@id', klaar: '@klaar'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle opdrachten ophalen, wijzigen of een nieuwe toevoegen
        factory('OpdrachtenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/opdracht/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de opdrachten te tonen en om een opdracht te verwijderen
        controller('opdrachtCtrl', function($scope, $location, OpdrachtenFactory, OpdrachtFactory) {

            // Haal de lijst van opdrachten op
            $scope.getList = function() {
                OpdrachtenFactory.all(function(data) {
                    $scope.opdrachten = data;
                });
            };

            // Navigeer naar een nieuwe opdracht aanmaken
            $scope.add = function() {
                $location.path('admin/opdracht');
            };

            // Navigeer naar de details van een opdracht
            $scope.update = function(opdrachtId) {
                $location.path('admin/planning/' + opdrachtId);
            };

            // Verwijder een werknemer
            $scope.delete = function(opdrachtId) {
                OpdrachtFactory.delete({id: opdrachtId}, function() {
                    $scope.getList();
                });
            };
            $scope.getList();
            this.test = "test";
        }).
        // Controller om de details van een werknemer te tonen en te wijzigen
        controller('opdrachtDetailCtrl', function($scope, $routeParams, OpdrachtFactory, OpdrachtenFactory, KlantFactory, KlantenFactory, VoertuigFactory, VoertuigenFactory, OpleggerFactory, OpleggersFactory, WerknemerFactory, WerknemersFactory) {
            $scope.state = true;
            $scope.opdracht = OpdrachtFactory.show({id: $routeParams.id});
            $scope.klant = KlantFactory.show({id: $routeParams.id});
            $scope.voertuig = VoertuigFactory.show({id: $routeParams.id});
            $scope.oplegger = OpleggerFactory.show({id: $routeParams.id});
            $scope.werknemer = WerknemerFactory.show({id: $routeParams.id});


            $scope.edit = function() {
                $scope.state = false;
            };
            $scope.save = function() {
                OpdrachtenFactory.update($scope.opdracht);
                KlantenFactory.update($scope.klant);
                VoertuigenFactory.update($scope.voertuig);
                OpleggersFactory.update($scope.oplegger);
                WerknemersFactory.update($scope.werknemer);
                $scope.state = true;
            };
            $scope.cancel = function() {
                $scope.state = true;
            };
        }).
        // Controller om een nieuwe werknemers toe te voegen
        controller('opdrachtCreateCtrl', function($scope, $timeout, $location, OpdrachtenFactory, KlantenFactory, VoertuigenFactory, OpleggersFactory, WerknemersFactory) {
            $scope.klanten = KlantenFactory.all();
            $scope.voertuigen = VoertuigenFactory.all();
            $scope.opleggers = OpleggersFactory.all();
            $scope.werknemers = WerknemersFactory.all();

            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            ;
            var day = d.getDate();
            $scope.date = year + "-" + month + "-" + day;

            $scope.addKlant = function() {
                $location.path('/admin/opdracht/klant');
            };

            $scope.addVoertuig = function() {
                $location.path('/admin/opdracht/voertuig');
            };

            $scope.addWerknemer = function() {
                $location.path('/admin/opdracht/werknemer');
            };

            $scope.addOplegger = function() {
                $location.path('/admin/opdracht/oplegger');
            };

            $scope.create = function(opdracht) {
                OpdrachtenFactory.create(opdracht, function() {
                    $timeout(function() {
                        $location.path('/admin/administratie');
                    });
                });
            };
        }).
        // GEBRUIKERS
        // FACTORY
        // Factory voor de tabel gebruiker
        // In deze factory kan men een gebruiker ophalen of verwijderen
        factory('GebruikerFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/gebruiker/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle werknemers ophalen, wijzigen of een nieuwe toevoegen
        factory('GebruikersFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/gebruiker/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // ADRESSEN
        // FACTORY
        // Factory voor de tabel adres
        // In deze factory kan men een gebruiker ophalen of verwijderen
        factory('AdresFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/adres/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle werknemers wijzigen of een nieuwe toevoegen
        factory('AdressenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/adres/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTACTEN
        // FACTORY
        // Factory voor de tabel contact
        // In deze factory kan men een contact ophalen of verwijderen
        factory('ContactFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/contact/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle contacten ophalen, wijzigen of een nieuwe toevoegen
        factory('ContactenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/contact/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // TALEN
        // FACTORY
        // Factory voor de tabel taal
        // In deze factory kan men een taal ophalen of verwijderen
        factory('TaalFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/taal/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle talen ophalen, wijzigen of een nieuwe toevoegen
        factory('TalenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/taal/?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', isArray: true},
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // RIJBEWIJSGEGEVENS
        // FACTORY
        // Factory voor de tabel rijbewijsgegevens
        // In deze factory kan men een rijbewijsgegeven ophalen of verwijderen
        factory('RijbewijsFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/rijbewijsgegevens/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });
        }).
        // In deze factory kan men alle rijbewijsgegevens wijzigen of een nieuwe toevoegen
        factory('RijbewijzenFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/rijbewijsgegevens/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });
        }).
        // PERSOONSINFO
        // FACTORY
        // Factory voor de tabel persoonsinfo
        // In deze factory kan men een persoonsinfo ophalen of verwijderen
        factory('PersoonsinfoFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/persoonsinfo/:id?CALLBACK=JSONP_CALLBACK', {}, {
                show: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });
        }).
        // In deze factory kan men alle persoonsinfo wijzigen of een nieuwe toevoegen
        factory('PersoonsinfosFactory', function($resource) {
            return $resource('http://localhost:8084/publictms/persoonsinfo/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'POST', headers: {'Content-Type': 'application/json'}},
                update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });
        }).
        // BERICHTEN
        // FACTORY
        // Factory voor de tabel BERICHTEN
        // In deze factory kan men een berichten ophalen of verwijderen
        factory('BerichtFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/bericht/:id?CALLBACK=JSONP_CALLBACK', {}, {
                all: {method: 'GET', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            });

        }).
        // In deze factory kan men alle berichten wijzigen of een nieuwe toevoegen
        factory('BerichtenFactory', function($resource) {

            return $resource('http://localhost:8084/publictms/bericht/?CALLBACK=JSONP_CALLBACK', {}, {
                create: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
            });

        }).
        // CONTROLLER
        // Controller om de berichten op te halen en een bericht te verwijderen
        controller('berichtCtrl', function($scope, $location, BerichtFactory) {

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
                    $scope.getList(1);
                });
            };

            $scope.select = function(bericht) {
                $scope.bericht = bericht;
            };

            $scope.getList(1);

        }).
        // Controller om een nieuw bericht te verzenden
        controller('nieuwBerichtCtrl', function($scope, $location, $timeout, BerichtenFactory) {
            $scope.send = function(bericht) {
                BerichtenFactory.create(bericht, function() {
                    $timeout(function() {
                        $location.path('/admin/berichten');
                    });
                });

            };
        }).
        // NAVIAGTIE
        // CONTROLLER
        controller('MapCtrl', function MapCtrl($scope) {
            $scope.gmap = {
                fromAddress: 'thuis',
                streetAddress: "vlinderstraat",
                businessWriteup: "test",
                businessTitle: "test",
                Lon: 50.924565,
                Lat: 5.313465
            };
        }).
        controller('MainSchedulerCtrl', function($scope) {
            $scope.events = [
                {id: 1, text: "Task A-12458",
                    start_date: new Date(2013, 10, 12),
                    end_date: new Date(2013, 10, 16)},
                {id: 2, text: "Task A-83473",
                    start_date: new Date(2014, 1, 5),
                    end_date: new Date(2014, 1, 8)},
                {id: 3, text: "Task A-123",
                    start_date: new Date(2014, 1, 5),
                    end_date: new Date(2014, 1, 13)}
            ];

            $scope.scheduler = {date: new Date(2013, 10, 1)};

        });