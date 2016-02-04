'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  EventModel = mongoose.model('Event'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, eventModel;

/**
 * Event routes tests
 */
describe('Event CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new event
    user.save(function () {
      eventModel = {
        title: 'Event Title',
        content: 'Event Content'
      };

      done();
    });
  });

  it('should be able to save an event if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new event
        agent.post('/api/events')
          .send(eventModel)
          .expect(200)
          .end(function (eventSaveErr, eventSaveRes) {
            // Handle event save error
            if (eventSaveErr) {
              return done(eventSaveErr);
            }

            // Get a list of events
            agent.get('/api/events')
              .end(function (eventsGetErr, eventsGetRes) {
                // Handle event save error
                if (eventsGetErr) {
                  return done(eventsGetErr);
                }

                // Get events list
                var events = eventsGetRes.body;

                // Set assertions
                (events[0].user._id).should.equal(userId);
                (events[0].title).should.match('Event Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an event if not logged in', function (done) {
    agent.post('/api/events')
      .send(eventModel)
      .expect(403)
      .end(function (eventSaveErr, eventSaveRes) {
        // Call the assertion callback
        done(eventSaveErr);
      });
  });

  it('should not be able to save an event if no title is provided', function (done) {
    // Invalidate title field
    eventModel.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new event
        agent.post('/api/events')
          .send(eventModel)
          .expect(400)
          .end(function (eventSaveErr, eventSaveRes) {
            // Set message assertion
            (eventSaveRes.body.message).should.match('Title cannot be blank');

            // Handle event save error
            done(eventSaveErr);
          });
      });
  });

  it('should be able to update an event if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new event
        agent.post('/api/events')
          .send(eventModel)
          .expect(200)
          .end(function (eventSaveErr, eventSaveRes) {
            // Handle event save error
            if (eventSaveErr) {
              return done(eventSaveErr);
            }

            // Update event title
            eventModel.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing event
            agent.put('/api/events/' + eventSaveRes.body._id)
              .send(eventModel)
              .expect(200)
              .end(function (eventUpdateErr, eventUpdateRes) {
                // Handle event update error
                if (eventUpdateErr) {
                  return done(eventUpdateErr);
                }

                // Set assertions
                (eventUpdateRes.body._id).should.equal(eventSaveRes.body._id);
                (eventUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of events if not signed in', function (done) {
    // Create new event model instance
    var eventObj = new EventModel(eventModel);

    // Save the event
    eventObj.save(function () {
      // Request events
      request(app).get('/api/events')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single event if not signed in', function (done) {
    // Create new event model instance
    var eventObj = new EventModel(eventModel);

    // Save the event
    eventObj.save(function () {
      request(app).get('/api/events/' + eventObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', eventModel.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single event with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/events/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Event is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single event which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent event
    request(app).get('/api/events/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No event with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an event if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new event
        agent.post('/api/events')
          .send(eventModel)
          .expect(200)
          .end(function (eventSaveErr, eventSaveRes) {
            // Handle event save error
            if (eventSaveErr) {
              return done(eventSaveErr);
            }

            // Delete an existing event
            agent.delete('/api/events/' + eventSaveRes.body._id)
              .send(eventModel)
              .expect(200)
              .end(function (eventDeleteErr, eventDeleteRes) {
                // Handle event error error
                if (eventDeleteErr) {
                  return done(eventDeleteErr);
                }

                // Set assertions
                (eventDeleteRes.body._id).should.equal(eventSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an event if not signed in', function (done) {
    // Set event user
    eventModel.user = user;

    // Create new event model instance
    var eventObj = new EventModel(eventModel);

    // Save the event
    eventObj.save(function () {
      // Try deleting event
      request(app).delete('/api/events/' + eventObj._id)
        .expect(403)
        .end(function (eventDeleteErr, eventDeleteRes) {
          // Set message assertion
          (eventDeleteRes.body.message).should.match('User is not authorized');

          // Handle event error error
          done(eventDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      EventModel.remove().exec(done);
    });
  });
});
