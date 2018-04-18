import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    session: service(),
    currentUser: service(),
    store: service(),
    username: '',
    password: '',
    actions: {
        storeuser(){
            let user = this.get('store').createRecord('user',{
               username: this.get('username'),
               password: this.get('password') 
            });
            user.save();
            //this.get('store').findAll('user').then(data => {
              //this.set('data', data);
            //});
        },
    },
});
