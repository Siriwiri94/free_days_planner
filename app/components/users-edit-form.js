import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
    store: service(),
    actions:{
        recordUser(){
            var newUser= this.get('model');
              newUser.save();
              alert('the user has been updated')
        },  
    }
});