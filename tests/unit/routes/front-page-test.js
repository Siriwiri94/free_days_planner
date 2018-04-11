import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | front_page', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:front-page');
    assert.ok(route);
  });
});
