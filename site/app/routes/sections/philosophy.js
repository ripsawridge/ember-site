import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return Ember.$.getJSON("/articles/philosophy/index.json").then(function (results) {
            return results;
        });
     }
});