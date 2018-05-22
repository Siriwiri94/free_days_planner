import DS from 'ember-data';
import { computed } from '@ember/object';
export default DS.Model.extend({
    username: DS.attr('string'),
    name: DS.attr('string'),
    password: DS.attr('string'),
    role: DS.attr('string'),
    token: DS.attr('string'),
    pushToken: DS.attr('string'),
    surname: DS.attr('string'),
    phone: DS.attr('string'),
    email: DS.attr('string'),
    days_left:DS.attr('number'),
    language:DS.attr('string'),
    remainingDays:DS.attr('number'),
    totalDays:DS.attr('number'),
    isAdmin: computed('role', function(){
        return this.get('role') ==='admin';
    }),
    isWorker: computed('role', function(){
        return this.get('role') ==='worker';
    })
});
