import DS from 'ember-data';
import Ember from 'ember';
import { computed } from '@ember/object';
export default DS.Model.extend({
    username: DS.attr('string'),
    name: DS.attr('string'),
    password: DS.attr('string'),
    role: DS.attr('string'),
    token: DS.attr('string'),
    days_left:DS.attr('number'),
    isAdmin: Ember.computed('role', function(){
        return this.get('role') ==='admin';
    })
});
