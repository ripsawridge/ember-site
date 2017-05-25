import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller) {
        controller.set('fixedTop', false);
        controller.set('fixedBottom', false);
        controller.set('hideTopBar', false);
        controller.set('hideBottomBar', false);
    },
    actions: {
        fixedTop: function() {
            this.get('controller').set('fixedTop', true);
        },
        unfixedTop: function() {
            this.get('controller').set('fixedTop', false);
        },
        fixedBottom: function() {
            this.get('controller').set('fixedBottom', true);
        },
        unfixedBottom: function() {
            this.get('controller').set('fixedBottom', false);
        },
        showTopBar: function() {
            this.get('controller').set('hideTopBar', false);
        },
        showBottomBar: function () {
            this.get('controller').set('hideBottomBar', false);
        },
        hideTopBar: function() {
            this.get('controller').set('hideTopBar', true);
        },
        hideBottomBar: function () {
            this.get('controller').set('hideBottomBar', true);
        }
    }
});
