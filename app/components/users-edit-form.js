import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    store: service(),
    username: null,
    name: null,
    surname: null,
    phone: null,
    email: null,
    password: null,
    role:'worker',
    actions:{
        setSelection: function(selected) {
            this.set('role', selected);
        },  
        recordUser(){
            var newUser= this.get('model');
              newUser.save();
              alert('the user has been updated')
        },
    }
});