import Ember from 'ember';

export default Ember.Component.extend({
    paragraph: 0,
    length: 200,
    lorem: '',
    loremParagraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan luctus elementum. Nam faucibus nisi id pulvinar eleifend. Nam tempus mauris id felis ultricies facilisis. Pellentesque rhoncus ligula porta, semper est nec, feugiat lacus. Maecenas eu pretium ligula. Aenean maximus nisl id consequat faucibus. Vivamus ut suscipit ex. Suspendisse accumsan odio vestibulum tristique condimentum. Donec vehicula magna ullamcorper, cursus ante id, porttitor enim. Duis maximus accumsan faucibus. Quisque quis augue ut ipsum efficitur dapibus. In varius imperdiet purus. Donec fermentum, metus quis sollicitudin lobortis, nisi nibh dapibus sem, sit amet auctor risus mi ac diam. Vivamus ante ligula, elementum sit amet odio iaculis, ultricies lobortis neque. Morbi laoreet auctor molestie.',
        'Proin nec finibus justo. Curabitur tristique blandit posuere. Aenean eu luctus nisl, id posuere mauris. Suspendisse aliquet interdum nunc. Nullam dapibus orci at varius tempus. Cras lobortis mauris vel ante aliquam sagittis. Nunc ultricies mauris in mattis varius. In hac habitasse platea dictumst. Donec fermentum mauris at tellus pulvinar imperdiet. Proin eleifend est sit amet neque posuere egestas. Ut finibus ex sit amet eleifend viverra. Fusce ligula risus, euismod sed blandit et, commodo eget mauris. Aliquam in enim nec nunc congue fermentum eu eget elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris non erat faucibus, aliquam odio vel, rutrum ipsum.',
        'Nulla porttitor augue ullamcorper pulvinar pellentesque. Nunc et vulputate quam. Nunc eget mollis justo. Nam tincidunt scelerisque nibh, at laoreet mauris pretium id. Morbi pellentesque massa ullamcorper vehicula tincidunt. Quisque bibendum, augue ac tincidunt sodales, felis tortor porttitor nisi, vitae tincidunt enim sapien nec ex. Morbi fringilla libero quis sapien imperdiet, et auctor orci luctus. Proin vel purus dictum, ultrices leo in, suscipit mauris. Aliquam quis blandit dui.',
        'Nunc ac eleifend lorem. Quisque elementum pretium est, ac egestas erat faucibus sed. Sed tincidunt consequat arcu at placerat. Morbi ut faucibus sem. Vivamus id ante eget ex semper feugiat sed luctus sem. Vivamus volutpat leo ut mollis faucibus. Etiam libero tellus, rhoncus at mauris vitae, consequat cursus tellus.',
        'Phasellus vel leo porttitor, hendrerit sem vel, iaculis dolor. Praesent in efficitur tellus. Suspendisse tristique dapibus sollicitudin. Phasellus pellentesque cursus lacus, eget dapibus purus eleifend vitae. Suspendisse convallis sem sit amet leo egestas, in porta sapien sollicitudin. Aenean a euismod augue. Nunc vitae pretium quam. Cras vel congue justo, sed volutpat mauris. Duis tristique, sapien id rutrum placerat, nibh tellus viverra elit, eu iaculis lectus felis quis elit. In ornare sagittis metus sed aliquet. Cras porta lacus ante, a eleifend odio varius at. Donec porttitor ipsum ac dignissim mattis. Aliquam porta aliquam quam, sed varius sem volutpat ac.',
    ],
    tagName: 'span',

    didInsertElement() {
        let lorem = this.get('loremParagraphs')[this.get('paragraph') < 4 ? this.get('paragraph') : 0];

        if (this.get('length') > lorem.length) {
            this.set('length', lorem.length);
        }

        // Trim paragraph and remove single word followed by a period or single periods.
        //
        this.set('lorem', lorem.substring(0, this.get('length')).trim().replace(/\W*(\s\w*)\.*$/, '') + '.');
        //
    }
});
