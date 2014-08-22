/* global createMap */

(function(){
  'use strict';

  $(document).ready(function(){
    var lat = $('tbody tr').attr('data-lat') * 1,
        lng = $('tbody tr').attr('data-lng') * 1;

    createMap('smlmap', lat, lng, 10);
  });
})();

