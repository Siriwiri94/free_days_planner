import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  currentUser: service(),
  renderStart: null,
  renderEnd: null,
  actions: {
    dateChange(view) {
      this.set('renderStart', view.start);
      this.set('renderEnd', view.end);
    },
  }
});