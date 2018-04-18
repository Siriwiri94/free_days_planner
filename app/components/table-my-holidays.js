import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    session: service(),
    currentUser: service(),
    store: service(),
    data: null, 
    didInsertElement() {
        this.get('store').query('vacation-request', {filter: {user:this.get('currentUser.user.id')}, include: 'vacation-type'}).then(data => {
            this.set('data', data);
        })
    },
    actions:{
        deleteHoliday(holiday){
            this.get('store').findRecord('vacation-request', holiday.id, { backgroundReload: false }).then(function(holiday) {
                holiday.destroyRecord();
              });
        }
    } 
});