import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ember from 'ember';
export default Component.extend({
    remainingPrint:null,
    showMessage:false,
    data:null,
    store: service(),
    currentUser: service(),
    editRequest:null,
    startDate:null,
    endDate: null,
    selectedType:null,
    selectedOption:null,
    savedRange:null,
    totalDays: computed('editRequest.startDay', 'editRequest.endDay', function(){
        var firstDate = new Date(this.get('editRequest.startDay'));
        var lastDate = new Date(this.get('editRequest.endDay'));
        var start= firstDate.getTime();
        var end= lastDate.getTime();
        var diff = end-start;
        return diff/(1000*60*60*24)+1;
    }),
    didInsertElement(){
        this.set('editRequest', this.get('store').findRecord('vacation-request', this.get('editId'), {include: 'vacationType'}, {include: 'user'}));
        this.get('store').findAll('vacation-type').then(data => {
            this.set('data', data);
           
        });
    },
    actions:{
        setSelection: function(selected) {
            if(selected=="wasSelected"){
                this.get('selectedOption', this.get('editRequest.vacationType.id'));
            }else{
                this.set('selectedOption', selected)
            } 
        }, 
        setDateRange(from, to){
            this.set('editRequest.startDay', from);
            this.set('editRequest.endDay', to);
        },
        hideDatePicker(){

        },
        cancelDatePicker(){

        },
        editHoliday(){
            if(this.get('selectedOption')){
                this.set('selectedType', this.get('selectedOption'));
            }else{
                this.set('selectedType', this.get('editRequest.vacationType.id'));
            }
            var user= this.get('editRequest.user');
            var remaining = user.get('remainingDays') + this.get('editRequest.businessDays');
            this.set('remainingPrint', remaining);
            var difference= remaining - this.get('totalDays');
            if(difference <= 0){
                this.set('showMessage', true);
                ember.run.later((()=> {
                    this.set('showMessage', false);
                }), 2000);
            }else{
                var editStart= new Date (this.get('editRequest.startDay'));
                var editEnd= new Date(this.get('editRequest.endDay'));
                this.get('store').findRecord('vacation-request', this.get("editRequest.id")).then(record => {
                    record.set('startDay', editStart);
                    record.set('endDay', editEnd);
                    record.set('vacationType', this.get('store').peekRecord('vacationType', this.get('selectedType')));
                    record.save().then(() => {
                        this.sendAction('close');
                    });
                });
            }
        }, 
    },
});
