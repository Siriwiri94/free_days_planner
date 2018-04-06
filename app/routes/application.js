import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
    currentUser: service(),
    beforeModel() {
        this._super(...arguments);
        if (this.get('session.isAuthenticated')) {
            return this._loadCurrentUser();
        }
    },
    sessionAuthenticated() {
        this._super(...arguments);
        this._loadCurrentUser();
      },
    
      _loadCurrentUser() {
        return this.get('currentUser').load().catch(e => {
            this.get('session').invalidate();            
        });
      }
});