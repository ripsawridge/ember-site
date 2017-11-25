import Ember from 'ember';

export default Ember.Route.extend({
    activate: function() {
        this.send('unfixedTop');
        this.send('unfixedBottom');
    },
    model: function () {
      return Ember.$.getJSON("/articles/trips/locations-stripped.json").then(
  	function (results) {
          return results;
        });
    }
});
