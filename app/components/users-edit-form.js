import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    store: service(),
    router: service(),
    actions:{
        recordUser(){
            var newUser= this.get('model');
              newUser.save().then(() => {
                alert('the user has been updated')
                this.get('router').transitionTo('admin_users');
              });
            },
    }
});