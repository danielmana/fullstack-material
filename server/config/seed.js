/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: '%CCH323-3-CANNOT_ALLOCATE_CCB:',
      info: 'cannot allocate call control block'
    }, {
      name: '%CCH323-3-CANNOT_CREATE_CRVHASH_TBL:',
      info: 'cannot create the H.323 crv hash table'
    }, {
      name: '%CCH323-3-CCH323_H225_SEND_EVENT_FAILED:',
      info: 'create send internal event [chars] to H.225 state machine failed'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
