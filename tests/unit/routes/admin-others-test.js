import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | admin_others', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin-others');
    assert.ok(route);
  });
});
