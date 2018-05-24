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
        document.addEventListener("deviceready", () => {this._registerPush()}, false);
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
            const pushToken = this.get('pushToken')
            if (pushToken) {
                user.set('pushToken', pushToken);
                user.save();
            }
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
    _registerPush(){
        const push = PushNotification.init({
            android: {
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        
        push.on('registration', (data) => {
            console.log("Registration",data);
            this.set('pushToken', data.registrationId);
        });
        
        push.on('notification', (data) => {
            console.log("Notification", data);
        });

        push.on('acceptRequest', (data) => {
            console.log("acceptRequest", data);
        });

        push.on('denyRequest', (data) => {
            console.log("denyRequest", data);
        });

        push.on('error', (e) => {
            console.error(e);
        });
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