import Component from '@ember/component';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { computed } from '@ember/object';
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
    today:moment(),
    tomorrow: computed('today', function(){
        return moment(this.get('today')).add(1, 'day');
    }),
    isDisabled:true,
    didInsertElement(){
        this.get('store').findAll('vacation-type').then(data => {
            this.set('data', data);  
        })
        if(this.get('currentUser.user.isAdmin')){
            this.get('store').findAll('user').then(dataUser => {
                this.set('dataUser', dataUser);  
            })
        }
        this.set('userToSave', this.get('currentUser'))
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
        setSelectedUser: function(selected){
            this.set('userToSave', selected)
        },
        recordHoliday(){
            var vacationRequest= this.get('store').createRecord('vacation-request', {
                startDay: new Date(this.get('startDay')),
                endDay: new Date(this.get('endDay')),
                accepted: '',
                vacationType: this.get('store').peekRecord('vacationType', this.get('selectedOption')),
                user:this.get('store').peekRecord('user', this.get('userToSave')),
                documents: [this.get('document')],
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
