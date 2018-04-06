import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    name: DS.attr('string'),
    password: DS.attr('string'),
    role: DS.attr('string'),
    token: DS.attr('string'),
});
