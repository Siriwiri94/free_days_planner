import DS from 'ember-data';
import { computed } from '@ember/object';
export default DS.Model.extend({
    startDay: DS.attr('date'),
    endDay: DS.attr('date'),
    accepted: DS.attr('boolean'),
    user: DS.belongsTo('user'),
    userId: DS.attr('number'),
    vacationType: DS.belongsTo('vacationType'),
    state: computed('accepted', function(){
        if(this.get('accepted')===true){
            return 'Aceptado'
        }else if(this.get('accepted')===false){
            return 'Rechazado'
        }else if(this.get('accepted')==null){
            return 'Pendiente'
        }
    })
});
