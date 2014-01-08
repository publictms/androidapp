'use strict';

/* Directives */


angular.module('myApp.directives', []).
        
        // Een directive voor Google Maps
        directive('gmap', function($window, $parse) {
            var counter = 0,
                    prefix = '__ep_gmap_';

            return {
                restrict: 'A',
                replace: false,
                templateUrl: 'partials/administrator/gmap.html',
                link: function(scope, element, attrs, controller) {
                    var getter = $parse(attrs.gmap),
                            setter = getter.assign;

                    var model = scope.gmap;
                    model.totalKm = 0;

                    setter(scope, model);

                    if ($window.google && $window.google.maps) {
                        gInit();
                    } else {
                        injectGoogle();
                    }

                    // Werk alle gegevens bij
                    function gInit() {
                        var Location = new google.maps.LatLng(model.Lat, model.Lon),
                                directionsService = new google.maps.DirectionsService(),
                                directionsDisplay = new google.maps.DirectionsRenderer({
                                    draggable: true
                                }),
                        mapOptions = {
                            center: Location,
                            zoom: 11,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        },
                        map = new google.maps.Map(document.getElementById("map_canvas"),
                                mapOptions);
                        // voeg een 'marker' toe
                        var contentString = model.businessWriteup + model.streetAddress,
                                marker = new google.maps.Marker({
                                    position: Location,
                                    map: map,
                                    title: model.businessTitle,
                                    animation: google.maps.Animation.DROP
                                });
                        // toon informatievenster
                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                        directionsDisplay.setMap(map);
                        directionsDisplay.setPanel(document.getElementById('directions'));
                        model.setDirections = function() {
                            var selectedMode = 'DRIVING',
                                    from = model.fromAddress,
                                    request = {
                                        origin: from,
                                        destination: model.streetAddress,
                                        travelMode: selectedMode,
                                        provideRouteAlternatives: false,
                                        unitSystem: google.maps.UnitSystem.METRIC,
                                        optimizeWaypoints: true
                                    };
                            if (selectedMode === 'TRANSIT') {
                                request.transitOptions = {
                                    departureTime: new Date()
                                };
                            }

                            directionsService.route(request, function(response, status) {
                                if (status === google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                } else {
                                    if (angular.isFunction(model.showError)) {
                                        scope.$apply(function() {
                                            model.showError(status);
                                        });
                                    }
                                }
                            });
                        }

                        // Haal de huidige locatie op
                        if ("geolocation" in navigator) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                                var pos = new google.maps.LatLng(position.coords.latitude,
                                        position.coords.longitude);
                                //map.setCenter(Location);
                                scope.$apply(function() {
                                    model.fromAddress = pos;
                                });
                                model.setDirections();
                            });
                        }

                        // Bereken en toon de route indien de aanvraag aanpast
                        google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {

                            computeTotalDistance(directionsDisplay.directions);
                            try {
                                if (directionsDisplay.directions.routes[0].legs[0]) {

                                    scope.$apply(function() {
                                        model.fromAddress = directionsDisplay.directions.routes[0].legs[0].start_address;
                                    });
                                }
                            } catch (e) {
                            }
                        });

                        model.setDirections();

                        // Bereken de totale afstand
                        function computeTotalDistance(result) {
                            var total = 0, i,
                                    myroute = result.routes[0];
                            for (i = 0; i < myroute.legs.length; i++) {
                                total += myroute.legs[i].distance.value;
                            }
                            total = total / 1000;
                            scope.$apply(function() {
                                model.totalKm = total;
                            });
                        }

                    }

                    // Google API
                    function injectGoogle() {
                        var cbId = prefix + ++counter;

                        $window[cbId] = gInit;

                        var wf = document.createElement('script');
                        wf.type = 'text/javascript';
                        wf.async = 'true';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(wf, s);
                    }
                    ;
                }
            };
        });
/*.
 directive('accessLevel', ['Auth', function(Auth) {
 return {
 restrict: 'A',
 link: function($scope, element, attrs) {
 var prevDisp = element.css('display')
 , userRole
 , accessLevel;
 
 $scope.user = Auth.user;
 $scope.$watch('user', function(user) {
 if(user.role)
 userRole = user.role;
 updateCSS();
 }, true);
 
 attrs.$observe('accessLevel', function(al) {
 if(al) accessLevel = $scope.$eval(al);
 updateCSS();
 });
 
 function updateCSS() {
 if(userRole && accessLevel) {
 if(!Auth.authorize(accessLevel, userRole))
 element.css('display', 'none');
 else
 element.css('display', prevDisp);
 }
 }
 }
 };
 }]).
 directive('activeNav', ['$location', function($location) {
 return {
 restrict: 'A',
 link: function(scope, element, attrs) {
 var nestedA = element.find('a')[0];
 var path = nestedA.href;
 
 scope.location = $location;
 scope.$watch('location.absUrl()', function(newPath) {
 if (path === newPath) {
 element.addClass('active');
 } else {
 element.removeClass('active');
 }
 });
 }
 
 };
 
 }]);*/
