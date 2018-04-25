import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    session: service(),
    store: service(),
    data: null,
    didInsertElement() {
        this.get('store').findAll('user').then(data => {
            this.set('data', data);
        })
    },
    actions:{
        deleteUser(user){
            this.get('store').findRecord('user', user.id, { backgroundReload: false }).then(function(user) {
                let confirmation = confirm('Are you sure?');
                if (confirmation) {
                    user.destroyRecord();
                }
            });
        }
    } 
});
