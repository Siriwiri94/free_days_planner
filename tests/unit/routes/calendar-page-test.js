import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | calendar-page', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:calendar-page');
    assert.ok(route);
  });
});
