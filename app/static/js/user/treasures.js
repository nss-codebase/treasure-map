/* global _, createMap, addMarker, google */

(function(){
  'use strict';

  var map, locations;

  $(document).ready(function(){
    map = createMap('bigmap', 39, -95, 4);
    debugger;
    locations = getLocations();
    locations = _.sortBy(locations, function(l){return l.order;});

    locations.forEach(function(loc){
      addMarker(map, loc.lat, loc.lng, loc.name, '/img/pirate.png');
    });

    displayDirections();
  });

  function getLocations(){
    return $('tbody tr').toArray().map(function(tr){
      var name   = $(tr).attr('data-name'),
          lat    = $(tr).attr('data-lat') * 1,
          lng    = $(tr).attr('data-lng') * 1,
          order  = $(tr).attr('data-order') * 1;
      return {name:name, lat:lat, lng:lng, order:order};
    });
  }

  function displayDirections(){
    var directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions'));

    var waypoints = locations.map(function(loc){
      return new google.maps.LatLng(loc.lat, loc.lng);
    });

    if(waypoints.length > 1){
      var origin      = waypoints[0],
          destination = waypoints[waypoints.length - 1];
      waypoints.shift();
      waypoints.pop();

      waypoints = waypoints.map(function(wp){
        return {location:wp, stopover:true};
      });

      var request = {
        origin:origin,
        destination:destination,
        waypoints:waypoints,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(response, status){
        if(status === google.maps.DirectionsStatus.OK){
          directionsDisplay.setDirections(response);
        }
      });
    }
  }
})();

