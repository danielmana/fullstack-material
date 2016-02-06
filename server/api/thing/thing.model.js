'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  description: String,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);
