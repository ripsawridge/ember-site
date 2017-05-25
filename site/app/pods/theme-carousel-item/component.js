import Ember from 'ember';

export default Ember.Component.extend({
    isActive: false,
    classNames: ['item'],
    classNameBindings: ['isActive:active']
});
