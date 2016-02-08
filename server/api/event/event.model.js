'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var mongoosePaginate = require('mongoose-paginate');

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  description: String,
  vendor: String,
  type: String,
  fac: String,
  criticality: String,
  fcaps: String,
  preg_name: String,
  preg_msg: String,
  msg_sample: String,
  explanation: String,
  fwd_type: String,
  action: String,

  psr: Number,
  trig_amt: Number,
  trig_win: Number,
  pairwith: Number,
  sev: Number,

  active: Boolean,
  si: Boolean,
  actionable: Boolean,
  fwd: Boolean
});

// add pagination
EventSchema.plugin(mongoosePaginate);

export default mongoose.model('Event', EventSchema);
