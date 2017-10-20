import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return Ember.$.getJSON("/articles/philosophy/" + params.slug + ".json").then(function (results) {
            console.log(results.description);
            return results;
        });
     }
});