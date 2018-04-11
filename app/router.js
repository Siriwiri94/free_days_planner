import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('authenticated', { path: '' }, function() {
    this.route('main_page');
  });
  this.route('main_page');
  this.route('reserve');
  this.route('admin_users');
  this.route('admin_requests');
  this.route('admin_others');
  this.route('user_page');
  this.route('tabs');
});

export default Router;
