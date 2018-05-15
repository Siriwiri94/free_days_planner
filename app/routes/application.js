import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend(ApplicationRouteMixin, {
    i18n: service(),
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

    sessionInvalidated() {
        this._super(...arguments);
        this.set('currentUser.user', null);
    },

    _loadCurrentUser() {
        return this.get('currentUser').load().then(user => {
            const language = user.get('language');
            if (language){
                this.set('i18n.locale', language);
            }
            if (user.get('isWorker')) {
                this.transitionTo('user_page')
            } else {
                this.transitionTo('calendar_page')
            }
        }, ()=> this.get('session').invalidate());
    },
    actions:{
        changeLanguage(language){
            this.set('i18n.locale', language);
        }   
    }
        
});