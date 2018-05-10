import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { match, not } from '@ember/object/computed';
import { notEmpty } from '@ember/object/computed';
export default Component.extend({
    store: service(),
    router: service(),
    username: null,
    name: null,
    surname: null,
    phone: null,
    email: null,
    password: null,
    role:'worker',
    isValid: match('email', /^.+@.+\..+$/) && notEmpty('username') && notEmpty('password') && notEmpty('email'),
    isDisabled: not('isValid'),
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
              newUser.save().then(() => {
                alert('A new user has been registered')
                this.setProperties({username: '', name: '', surname: '', phone: '', email: '', password:'', role:''});
                this.get('router').transitionTo('admin_users');
              });
        },
        
    }
});
