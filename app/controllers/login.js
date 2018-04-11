import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export function initialize(instance) {
  const applicationRoute = instance.container.lookup('route:application');
  const session          = instance.container.lookup('service:session');
  session.on('authenticationSucceeded', function() {
    applicationRoute.transitionTo('main_page');
  });
  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('login');
  });
}

export default Controller.extend({  
  session: service(),
  identification: 'siri',
  password:'siri',
  actions: {

    authenticate() {
      const credentials = this.getProperties('identification', 'password'),authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, credentials);
    },
  }
});