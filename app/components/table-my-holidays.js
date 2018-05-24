import Component from '@ember/component';
import { inject as service } from '@ember/service';
import ember from 'ember';
export default Component.extend({
    showMessage: false,
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
            this.get('store').findRecord('vacation-request', holiday.id, { backgroundReload: false }).then(holiday =>{
                let confirmation = confirm('Are you sure?');
                if (confirmation) {
                    holiday.destroyRecord().then(()=>{
                        this.set('showMessage', true);
                        ember.run.later((()=> {
                            this.set('showMessage', false);
                        }), 1500);
                    });
                }
              });
        }
    } 
});