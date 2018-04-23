import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('authenticated', { path: '' }, function() {
  });
  this.route('reserve');
  this.route('admin_users');
  this.route('admin_others');
  this.route('user_page');
  this.route('tabs');
  this.route('calendar_page');
  this.route('all_requests');
  this.route('pending_requests');
  this.route('new_user');
});

export default Router;
