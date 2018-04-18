import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    session: service(),
    currentUser: service(),
    store: service(),
    data: null, 
    didInsertElement() {
        this.get('store').query('vacation-request', {filter: {status:null}, include: 'vacation-type'}).then(data => {
            this.set('data', data);
        })
    },
    actions:{
        toAccept(holiday){
                this.get('store').findRecord('vacation-request', holiday.id).then(function(holiday){
                holiday.set('accepted', true);
                holiday.save();
            });
            
        },
        toDeny(holiday){
            this.get('store').findRecord('vacation-request', holiday.id).then(function(holiday){
                holiday.set('accepted', false);
                holiday.save();
            });
        }
    }
});

