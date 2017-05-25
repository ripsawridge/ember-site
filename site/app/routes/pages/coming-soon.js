import Ember from 'ember';

export default Ember.Route.extend({
    activate: function() {
        this.send('fixedTop');
        // Enable this option to hide the top bar in a coming soon page
        // this.send('hideTopBar');
        //
        this.send('hideBottomBar');
    },
    deactivate: function() {
        this.send('unfixedTop');
        // Enable this option to restore showing the top bar
        //this.send('showTopBar');
        //
        this.send('showBottomBar');
    }
});
