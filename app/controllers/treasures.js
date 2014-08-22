'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.new = function(req, res){
  res.render('treasures/new');
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.index = function(req, res){
  Treasure.all(req.query, function(err, treasures, next){
    res.render('treasures/index', {treasures:treasures, next:next});
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.found = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    treasure.isFound = true;
    treasure.save(function(){
      res.redirect('/treasures');
    });
  });
};

