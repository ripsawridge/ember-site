export default function() {

    let duration = 500;

    this.transition(
        this.fromRoute(['home']),
        this.toRoute(['sections']),
        this.use('explode', {
            matchBy: 'data-cover',
            use: ['fly-to', {duration}]
        })
    );

    this.transition(
        this.fromRoute(['sections', 'pages', 'galleries']),
        this.toRoute(['home']),
        this.useAndReverse('crossFade', {duration})
    );


    this.transition(
        this.toRoute(['sections.philosophy', 'sections.typewriters', 'sections.trips', 'sections.tech']),
        this.useAndReverse('explode', {
            matchBy: 'data-cover',
            use: ['fly-to', {duration}]
        })
    );

    this.transition(
        this.fromRoute(['pages', 'galleries']),
        this.useAndReverse('toLeft', {duration})
    );

    let pages = [
        'pages.contact-us',
        'pages.about-me',
        'pages.blog',
        'pages.coming-soon',
        'pages.friends',
        'pages.faqs',
        'pages.error-404',
        'galleries.masonry',
    ];

    this.transition(
        this.fromRoute(pages),
        this.toRoute(pages),
        this.useAndReverse('toLeft', {duration})
    );

}
