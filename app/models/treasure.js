'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(fields){
  this._id        = Mongo.ObjectID();
  this.location   = {lat: parseFloat(fields.lat[0]), lng: parseFloat(fields.lng[0]), address: fields.location[0]};
  this.name       = fields.name[0];
  this.difficulty = fields.difficulty[0];
  this.tags       = fields.tags[0].trim().split(',').map(function(t){return t.trim();});
  this.order      = fields.order[0] * 1;
  this.hints      = fields.hints;
  this.isFound    = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(query, cb){
  var sort   = {},
      filter = {};

  if(query.sort){
    sort[query.sort] = 1;
  }

  if(query.tags){
    filter.tags = query.tags;
  }

  Treasure.collection.find(filter).sort(sort).toArray(cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, cb);
};

Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  t.moveFiles(files);
  Treasure.collection.save(t, cb);
};

Treasure.prototype.moveFiles = function(files){
  var baseDir = __dirname + '/../static',
      relDir  = '/img/' + this._id,
      absDir  = baseDir + relDir;

  fs.mkdirSync(absDir);

  this.photos = files.photos.map(function(photo, index){
    var ext  = path.extname(photo.path),
        name = index + ext,
        absPath  = absDir + '/' + name,
        relPath  = relDir + '/' + name;

    fs.renameSync(photo.path, absPath);
    return relPath;
  });
};

module.exports = Treasure;

