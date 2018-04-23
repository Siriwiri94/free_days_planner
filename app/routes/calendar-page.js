import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
    data:null,
    model: function() {
        return this.store.findAll('vacation-request').then(data => {
            const vacationRequests = data.map(item => {
                return {
                    id: item.get('id'), 
                    title: item.get('user.name'), 
                    start: moment(item.get('startDay')).format('YYYY-MM-DD'),
                    end: moment(item.get('endDay')).format('YYYY-MM-DD')
                }
            });
            return vacationRequests;
        });
    },
});
