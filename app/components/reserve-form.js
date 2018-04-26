import Component from '@ember/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
export default Component.extend({
    data:null,
    store: service(),
    startDay:null,
    endDay: null,
    currentUser: service(),
    selectedOption: null,
    isDisabled: true,
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
            this.set('selectedOption', 1) ;
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
    ranges:{
        'Today': [moment(), moment()],
        'Tomorrow':[moment().add(1, 'day'),moment().add(1, 'day')],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
});
