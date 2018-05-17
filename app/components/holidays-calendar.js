import Component from '@ember/component';
import { inject as service } from '@ember/service';
import moment from 'moment';
export default Component.extend({
    router: service(),
    isShowingModal: false,
    store: service(),
    data:null,
    session: service(),
    currentUser: service(),
    renderStart: null,
    renderEnd: null,
    event:null,
    selectStart:null,
    selectEnd:null,
    isShowingForm: false,
    showModal: function() {
        this.toggleProperty('isShowingModal');
    },
    showModalForm: function(){
        this.toggleProperty('isShowingForm');
    },
    _loadData() {
         this.get('store').query('vacation-request', {
                filter: {
                    calendar:true,
                    start_date: this.get('startDate'), 
                    end_date: this.get('endDate') 
                }, include: 'user'}).then(data => {
                const vacationRequests = data.map(item => {
                    var endate = moment(item.get('endDay'), 'YYYY-MM-DD').add('days', 1);
                    endate= endate.format('YYYY-MM-DD');
                    return {
                        id: item.get('id'), 
                        title: item.get('user.username'), 
                        start: moment(item.get('startDay')).format('YYYY-MM-DD'),
                        end: endate,
                        color:'#00D1B3',
                        textColor:'white',
                        borderColor: 'white'
                    }
                });
                this.set('data', vacationRequests); 
            });
    },
    actions: {
        dateChange(view) {
            this.setProperties({
                startDate: view.start.toISOString(true), 
                endDate: view.end.toISOString(true)
            });
            this._loadData();
        },
        clicked(event){
            this.showModal(event);
            this.set('event', event);
        },
        closeModal(){
            this.set('isShowingModal', false);
            this.set('isShowingForm', false);
            this._loadData();
        },
        deleteEvent(eventId){
            this.get('store').findRecord('vacation-request', eventId, { backgroundReload: false }).then(event => {
                let confirmation = confirm('Are you sure?');
                if (confirmation) {
                    event.destroyRecord().then(() =>{
                        this._loadData();
                        this.set('isShowingModal', false);
                    });
                }
              });
        },
        select(start, end){
            this.set('selectStart', start);
            this.set('selectEnd', end);
            this.showModalForm();
        }
    },
 
});
