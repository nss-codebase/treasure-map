/* global geocode */

(function(){
  'use strict';

  $(document).ready(function(){
    $('#add-hint').click(addHint);
    $('button[type=submit]').click(addTreasure);
  });

  function addHint(){
    var $last  = $('form > .hint-group:last-of-type'),
        $clone = $last.clone();

    $last.after($clone);
  }

  function addTreasure(e){
    var location = $('#location').val();
    geocode(location, function(name, lat, lng){
      $('#location').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
    });

    e.preventDefault();
  }
})();

