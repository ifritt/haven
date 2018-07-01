
$(document).ready(function () {
    /*
        FADER
    */
    // fader.fadein();

    /*
        NAVIGATION BAR
    */
    loadNavigation({
        homeurl: '/',
        gamesurl: 'games'
    });

    /*
        BANNER
    */
    const bannerObject = new Banner({
        images: ['../public/images/2.jpg', '../public/images/0.png', '../public/images/1.jpg'],
        y_offset: ['-600px', '-650px', '-700px'],
        delay: 4000
    }).create();
});