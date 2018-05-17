import Component from '@ember/component';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
    data:null,
    store: service(),
    currentUser: service(),
    selectedOption: 1,
    isDisabled:true,
    rangeEndAt: computed('endDate', function(){
        return moment(this.get('endDate')).subtract(1, 'day');
    }),
    didInsertElement(){
        this.get('store').findAll('vacation-type').then(data => {
            this.set('data', data);
            
        })
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
        setSelection: function(selected) {
            this.set('selectedOption', selected)
        },
        recordHoliday(){
            var vacationRequest= this.get('store').createRecord('vacation-request', {
                startDay: new Date(this.get('startDate')),
                endDay: new Date(this.get('rangeEndAt')),
                accepted: '',
                vacationType: this.get('store').peekRecord('vacationType', this.get('selectedOption')),
                documents: [this.get('document')]
            });
              vacationRequest.save().then(() => {
                  this.sendAction('close');
              });
              alert('registered reservation')
        }, 
        setDocument(document){
            this.set('document', document);
            this.set('isDisabled', false);
        } 
    },
});