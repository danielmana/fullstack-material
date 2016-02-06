'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),

  EventModel = mongoose.model('Event'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a event
 */
exports.create = function (req, res) {
  var event = new EventModel(req.body);
  event.user = req.user;

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * Show the current event
 */
exports.read = function (req, res) {
  res.json(req.event);
};

/**
 * Update a event
 */
exports.update = function (req, res) {
  var event = req.event;

  event.title = req.body.title;
  event.content = req.body.content;

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * Delete an event
 */
exports.delete = function (req, res) {
  var event = req.event;

  event.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * List of Events
 */
exports.list = function (req, res) {
  EventModel.find().sort('-created').populate('user', 'displayName').exec(function (err, events) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(events);
    }
  });
};

/**
 * Event middleware
 */
exports.eventByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event is invalid'
    });
  }

  EventModel.findById(id).populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.event = event;
    next();
  });
};
