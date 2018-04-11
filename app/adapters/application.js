import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import config from 'free-days-planner/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:custom',
  host: config.host,
  pathForType(modelName) {
    return underscore(pluralize(modelName));
  }
})