import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      trips: Ember.$.getJSON("/articles/trips/index.json").then(function (results) {
        return results;
      }),
      locations: Ember.$.getJSON("/articles/trips/locations.json").then(function (results) {
        return results;
      })
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'trips', model.trips);
    Ember.set(controller, 'locations', model.locations);
  }
});
