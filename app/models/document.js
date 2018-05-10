import DS from 'ember-data';

export default DS.Model.extend({
    fileData: DS.attr(),
    url: DS.attr(),
    extension: DS.attr(),
});
