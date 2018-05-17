import Component from '@ember/component';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
    data:null,
    store: service(),
    currentUser: service(),
    editRequest:null,
    rangeEndAt: computed('endDate', function(){
        return moment(this.get('endDate')).subtract(1, 'day');
    }),
    didInsertElement(){
        this.set('editRequest', this.get('store').findRecord('vacation-request', this.get('editId')))
    },
    actions:{
        setDateRange(from, to){
            this.set('startDate', from);
            this.set('rangeEndAt', to);
        },
        hideDatePicker(){

        },
        cancelDatePicker(){

        },
        editHoliday(){
            var vacationRequest= this.get('store').createRecord('vacation-request', {
                startDay: new Date(this.get('startDate')),
                endDay: new Date(this.get('rangeEndAt')),
            });
              vacationRequest.save().then(() => {
                  this.sendAction('close');
              });
              alert('registered reservation')
        }, 
    },
});
