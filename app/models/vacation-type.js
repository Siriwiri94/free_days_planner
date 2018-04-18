import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('boolean'),
    name: DS.attr('string'),
});
