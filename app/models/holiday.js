import DS from 'ember-data';

export default DS.Model.extend({
    start_day: DS.attr('date'),
    end_day: DS.attr('date'),
    accepted: DS.attr('boolean'),
    user:DS.attr('number'), 
});
