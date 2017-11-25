import Ember from 'ember';

export default Ember.Controller.extend({
  tileserver: "http://c.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f13bfa644ac14730b74927c01e626a71",
  lat: 47.403597,
  lng: -120.518000,
  zoom: 8
});
