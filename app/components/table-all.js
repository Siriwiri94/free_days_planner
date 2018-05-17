import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    session: service(),
    store: service(),
    data: null,
    selectStart:null,
    selectEnd:null,
    isShowingForm: false,
    requestId:null,
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
        },
        closeModal(){
            this.set('isShowingForm', false);
        },
        showModalForm(holiday) { 
            this.toggleProperty('isShowingForm');
            this.set('requestId', holiday.id)
        },
    } 
});
