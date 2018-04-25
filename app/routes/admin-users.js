import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend(ApplicationRouteMixin,{
    currentUser: service(),
});
