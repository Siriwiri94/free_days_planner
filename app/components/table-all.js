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
    },
    actions:{
        deleteHoliday(holiday){
            this.get('store').findRecord('vacation-request', holiday.id, { backgroundReload: false }).then(function(holiday) {
                let confirmation = confirm('Are you sure?');
                if (confirmation) {
                    holiday.destroyRecord();
                }
              });
        }
    } 
});
