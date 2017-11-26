import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

    this.route('index', {path: '/'});

    this.route('home');

    this.route('sections', {}, function() {
        this.route('trips');
        this.route('trip', { path: 'trips/:slug'});
        this.route('tech');
        this.route('philosophy');
        this.route('ramble', { path: 'philosophy/:slug'});
        this.route('typewriters');
    });

    this.route('pages', {}, function() {
        this.route('about-me');
        this.route('blog');
        this.route('friends');
        this.route('error-404');
        this.route('locations');
    });

    this.route('galleries', {}, function(){
        this.route('masonry');
    });

});

export default Router;
