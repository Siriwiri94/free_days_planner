import Base from 'ember-simple-auth/authorizers/base';  
import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Base.extend({  
  session: service(),
  authorize(data, block) {
    if (Ember.testing) {
      block('Authorization', 'Bearer beyonce');
    }
    const { auth_token } = data
    if (this.get('session.isAuthenticated') && auth_token) {
      block('Authorization', `${auth_token}`);
    }
  }
});
