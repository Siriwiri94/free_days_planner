import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    data:null,
    store: service(),
    startDay:null,
    endDay: null,
    currentUser: service(),
    selectedOption: 1,
    isDisabled:true,
    didInsertElement(){
        this.get('store').findAll('vacation-type').then(data => {
            this.set('data', data);
            
        })
    },
    actions:{
        setDateRange(from, to){
            this.set('startDay', from);
            this.set('endDay', to);
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
                startDay: new Date(this.get('startDay')),
                endDay: new Date(this.get('endDay')),
                accepted: '',
                vacationType: this.get('store').peekRecord('vacationType', this.get('selectedOption')),
                documents: [this.get('document')]
            });
              vacationRequest.save();
              alert('registered reservation')
        }, 
        setDocument(document){
            this.set('document', document);
            this.set('isDisabled', false);
        } 
    },
});
