import Ember from 'ember';

export default Ember.Component.extend({
    itemsCount: 0,
    itemsArray: function() {
        var items;

            if (this.get('itemsCount') === 0) {
                return [];
            } else {
                items = Array(this.get('itemsCount'));
                items.fill(this.get('itemsCount'), {active: false});
                items[0] = { active: true };
            }
        return items;

    }.property('itemsCount')

});
