import Ember from 'ember';

export default Ember.Component.extend({
    safeImgSrc: Ember.computed('color', function() {
        var imgSrc = this.get('imgSrc');
        return Ember.String.htmlSafe('background-image: url(\'' + imgSrc + '\')');
    })
});


