import Ember from 'ember';

export default Ember.Component.extend({
    users: 23052,
    reviews: 522,
    downloads: 124203,
    visits: 502194,
    timer: null,
    didInsertElement: function() {
        var _this = this;

        this.set('timer', setInterval(function(){
            _this.incrementProperty('visits');
        }, 1000));
    },
    willDestroyElement: function() {
        clearInterval(this.get('timer'));
    }
});
