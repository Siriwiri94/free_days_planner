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
    showModal: function() {
        this.toggleProperty('isShowingModal');
    },
    actions: {
        dateChange(view) {
            this.get('store').query('vacation-request', {
                filter: {
                    calendar:true,
                    start_date:view.start.toISOString(true), 
                    end_date:view.end.toISOString(true) 
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
        clicked(event){
            this.showModal(event);
            this.set('event', event);
        },
        closeModal(){
            this.set('isShowingModal', false);
        },
        deleteEvent(eventId){
            this.get('store').findRecord('vacation-request', eventId, { backgroundReload: false }).then(event => {
                let confirmation = confirm('Are you sure?');
                if (confirmation) {
                    event.destroyRecord().then(() =>{
                        this.set('data', this.get('store').peekAll('vacation-request'));
                        this.set('isShowingModal', false);
                    });
                }
              });
        }
    },
 
});
