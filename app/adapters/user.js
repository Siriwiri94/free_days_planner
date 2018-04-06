import ApplicationAdapter from './application';
import { singularize } from 'ember-inflector';

export default ApplicationAdapter.extend({
  urlForQueryRecord(query) {
    if (query.me) {
      delete query.me;
      return singularize(this._super(...arguments));
    }

    return this._super(...arguments);
  }
});