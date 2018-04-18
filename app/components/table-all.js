import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    session: service(),
    store: service(),
    data: null,
    didInsertElement() {
        this.get('store').findAll('vacation-request', {include: 'vacationType'}).then(data => {
            this.set('data', data);
        })
    }
});