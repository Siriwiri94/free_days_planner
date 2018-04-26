import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service(),
    uploadPhoto: task(function * (file) {
        let response = yield file.upload('https://api.cloudinary.com/v1_1/none123/image/upload', {
            data: {upload_preset: 'iaywymy0'}
        });
        let body = get(response, 'body');
        var link = get(body, 'url');
        console.log(link);
        let document = this.get('store').createRecord('document', {
            fileData: JSON.stringify({
                id: get(body, 'public_id'),            
                storage: 'cache',
                metadata:{
                    filename: get(file, 'name'),
                    size: get(file, 'size'),
                    mime_type: get(file, 'type')
                },
            }),
            url: link
        });
        try {
            return yield document.save();
        } catch (e) {
             document.rollback();
        }
    }).maxConcurrency(3).enqueue(),

    actions: {
        uploadImage(file) {
            get(this, 'uploadPhoto').perform(file).then(document => {
                this.get('onUpload')(document);
            });
        }
    }
    
});
