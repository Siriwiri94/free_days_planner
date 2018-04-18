import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend(ApplicationRouteMixin, {
    currentUser: service(),
    beforeModel() {
        this._super(...arguments);
        if (this.get('session.isAuthenticated')) {
            return this._loadCurrentUser();
        }else{
            this.transitionTo('login');
        }
    },
    sessionAuthenticated() {
        this._super(...arguments);
        this._loadCurrentUser();
    },

    _loadCurrentUser() {
        return this.get('currentUser').load().then(user => {
            if (user.get('isAdmin')) {
                this.transitionTo('admin_requests')
            } else {
                this.transitionTo('user_page')
            }
        }, ()=> this.get('session').invalidate());
    }            
});