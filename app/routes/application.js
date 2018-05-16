import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend(ApplicationRouteMixin, {
    session: service(),
    moment: service(),
    i18n: service(),
    currentUser: service(),
    store: service(),
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
                this.get('moment').setLocale(language);
            }
            if (user.get('isWorker')) {
                this.transitionTo('user_page')
            } else {
                this.transitionTo('pending_requests')
            }
        }, ()=> this.get('session').invalidate());
    },
    actions:{
        changeLanguage(language){
            this.set('i18n.locale', language);
            this.get('moment').setLocale(language);
            if(this.get("currentUser.user.id")){
                this.store.find('user', this.get("currentUser.user.id")).then(function(record) {
                record.set('language', language);
                record.save();
                });
            } 
        }   
    }
});