import Component from '@ember/component';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { computed } from '@ember/object';
import ember from 'ember';
export default Component.extend({
    userToSave:null,
    data:null,
    store: service(),
    startDay:null,
    endDay: null,
    currentUser: service(),
    selectedOption: 1,
    dataUser:null,
    selectedUser:null,
    isDisabled:false,
    showMessage: false,
    rangeEndAt: computed('endDate', function(){
        return moment(this.get('endDate')).subtract(1, 'day');
    }),
    totalDays: computed('startDate', 'rangeEndAt', function(){
        var firstDate = new Date(this.get("startDate"));
        var lastDate = new Date(this.get("rangeEndAt"));
        var start= firstDate.getTime();
        var end= lastDate.getTime();
        var diff = end-start;
        return diff/(1000*60*60*24)+1;
    }),
    didInsertElement(){
        this.get('store').findAll('vacation-type').then(data => {
            this.set('data', data);
            
        })
        if(this.get('currentUser.user.isAdmin')){
            this.get('store').findAll('user').then(dataUser => {
                this.set('dataUser', dataUser);  
            })
        }
        this.set('userToSave', this.get('currentUser.user.id'))
    },
    actions:{
        setDateRange(from, to){
            this.set('startDate', from);
            this.set('endDate', to);
        },
        hideDatePicker(){

        },
        cancelDatePicker(){

        },
        setSelection: function(selected) {
            this.set('selectedOption', selected)
        },
        setSelectedUser: function(selected){
            this.set('userToSave', selected)
        },
        recordHoliday(){
            var user=this.get('store').peekRecord('user', this.get('userToSave'));
            var difference= user.get('remainingDays') - this.get('totalDays');
            if(difference <= 0){
                this.set('showMessage', true);
                ember.run.later((()=> {
                    this.set('showMessage', false);
                }), 2000);
            }else{
                var vacationRequest= this.get('store').createRecord('vacation-request', {
                    startDay: new Date(this.get('startDate')),
                    endDay: new Date(this.get('rangeEndAt')),
                    accepted: '',
                    vacationType: this.get('store').peekRecord('vacationType', this.get('selectedOption')),
                    user:this.get('store').peekRecord('user', this.get('userToSave')),
                    documents: [this.get('document')]
                });
                vacationRequest.save().then(() => {
                    this.sendAction('close');
                });
            }
        }, 
        setDocument(document){
            this.set('document', document);
            this.set('isDisabled', false);
        } 
    },
});