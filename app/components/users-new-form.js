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
            var newUser= this.get('store').createRecord('user', {
                username: this.get('username'),
                name: this.get('name'),
                surname: this.get('surname'),
                phone: this.get('phone'),
                email:this.get('email'),
                password: this.get('password'),
                role:this.get('role'),
              });
              newUser.save();
              alert('A new user has been registered')
        },
    }
});
