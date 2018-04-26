import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default DS.Model.extend({
    currentUser: service(),
    startDay: DS.attr('date'),
    endDay: DS.attr('date'),
    accepted: DS.attr('boolean', {allowNull: true}),
    user: DS.belongsTo('user'),
    vacationType: DS.belongsTo('vacationType'),
    state: computed('accepted', function(){
        if(this.get('accepted')===null){
            return 'Pending'
        }else{
            if(this.get('accepted')===true){
                return 'Accepted'
            }else if(this.get('accepted')===false){
                return 'Rejected'
            }
        }   
    }),
    totalDays: computed('startDay', 'endDay', function(){
        var start= this.get("startDay").getTime();
        var end= this.get("endDay").getTime();
        var diff = end-start;
        return diff/(1000*60*60*24)+1;
    }),
    isMe: computed('user.id', 'currentUser.user.id', function(){
        return this.get('user.id') === this.get('currentUser.user.id');
    }),
    documents: DS.hasMany('document'),
});
