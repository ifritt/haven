
const height = 20;

// class Fader {
//     constructor() { }
//     fadeout(callback) {
//         // fade out title
//         let titleElement = document.getElementById('title');
//         setTimeout(() => {
//             $(titleElement).animate({ opacity: '0' }, 600, 'easeOutQuint', callback);
//         }, 300);
//     }
//     fadein(callback) {
//         // fade out title
//         let titleElement = document.getElementById('title');
//         $(titleElement).animate({ opacity: '1' }, 600, 'easeOutQuint', callback);
//     }
// }

// let fader = new Fader();

class MenuOption {
    constructor(options, suboptions) {
        this.title = options.name;
        this.href = options.url;
        this.items = options.suboptions;
        this.x = options.x;
        this.y = options.y;
        this.callback = options.callback;
    }
    render(parentElement) {
        const items = this.items;
        const max = items.length;
        const x = this.x, y = this.y;
        const href = this.href;
        const callback = this.callback;

        /*main MenuOption*/
        let menuoption = document.createElement('div'); menuoption.innerText = this.title;
        menuoption.classList.add('menuoption');
        menuoption.setAttribute('style', 'height:' + height + 'px;left:' + x + 'px;top:' + y + 'px;');
        parentElement.appendChild(menuoption);

        let menuops = [];

        if (items.length > 0) {
            /*SubOption elements*/
            for (let i = 0; i < items.length; i++) {
                const target = items[i];
                const suboption = target.render(i, menuoption, x, y);
                menuoption.appendChild(suboption);
                menuops[i] = suboption;
            }
        }
        /*if href field of main button is not empty, then make main button link to that href*/
        if (href != '') {
            $(menuoption).click(function () {
                // fader.fadeout(function () {
                //     window.location.href = href;
                // });
                window.location.href = href;
            });
        }
        if (callback != '') {
            $(menuoption).click(this.callback);
        }

        /* 
         * hover
        */
        $(menuoption).hover(function () {
            $(menuoption).css('height', (max + 1) * height + 'px');
            $(menuoption).css('color', '#111');
            for (let i = 0; i < menuops.length; i++) {
                const target = menuops[i];
                target.style.opacity = 1;
                target.style.top = y + (i * (height * 0.6)) + height + 'px';
                $(target).css('pointer-events', 'all');
            }
        }, function () {
            $(menuoption).css('height', height + 'px');
            $(menuoption).css('color', '#999');
            for (let i = 0; i < menuops.length; i++) {
                var target = menuops[i];
                target.style.opacity = 0;
                target.style.top = y + (i * height) + (height * 2) + 'px';
                $(target).css('pointer-events', 'none');
            }
        });
        return this;
    }
}
class SubOption {
    constructor(options) {
        this.title = options.title;
        this.href = options.href;
        this.callback = options.callback;

        this.originalheight = '';
    }
    render(index, parent, x, y) {
        const href = this.href;
        const title = this.title;
        const callback = this.callback;

        const mh = (index * height) + height;
        this.originalheight = y + mh;
        /*suboption element*/
        const suboption = document.createElement('div');
        suboption.classList.add('suboption');
        suboption.innerText = title;
        /*if href field is not empty, then make menu option link to that href*/
        $(suboption).css('left', x + 'px');
        $(suboption).css('top', this.originalheight + height + 'px');
        $(suboption).css('width', $(parent).width());
        $(suboption).css('text-align', 'left');
        $(suboption).css('opacity', 0);
        $(suboption).css('transition', 'color 0.1s, opacity 0.2s, top 0.5s');
        if (href != '') {
            suboption.addEventListener('click', function () {
                //animate, then window.location.href=href;
                // fader.fadeout(function () {
                //     window.location.href = href
                // });
                window.location.href = href
            });
        }
        if (callback != '') {
            suboption.addEventListener('click', callback);
        }
        parent.appendChild(suboption); return suboption;
    }
}

class Banner {
    constructor(options) {
        this.images = options.images;
        this.yoffset = options.y_offset
        this.delayms = options.delay;
    }
    nextImage() {
    }
    create() {
        const delayms = this.delayms;
        const images = this.images;
        const yoffset = this.yoffset;
        let ilist = [];
        /*maximum size*/
        const bannerdiv = document.getElementById('banner');
        // bannerdiv.style.left=bannerdiv.offsetWidth/2+'px';
        /*if there is more than one image, then shuffle through them*/
        if (images.length > 1) {
            /*create one image for every image in array*/
            for (let i = 0; i < images.length; i++) {
                const img = document.createElement('img');
                const image = new Image();
                image.src = images[i];
                img.src = images[i];
                img.setAttribute('style', 'position:absolute;top:' + yoffset[i] + ';min-width:100%;max-width:100%;min-height:auto;max-height:auto;opacity:1;')
                img.setAttribute('index', i);
                bannerdiv.appendChild(img);
                ilist[i] = img;
            }
            let current = 0;
            function next() {
                setTimeout(next, delayms);
                for (let i = 0; i < ilist.length; i++) {
                    if (ilist[i].getAttribute('index') == current) {
                        // ilist[i].style.opacity=1;
                        $(ilist[i]).animate({ opacity: 1 }, 1000);
                    } else {
                        $(ilist[i]).animate({ opacity: 0 }, 1000);
                    }
                }
                current++;
                if (current >= ilist.length) current = 0;
            }
            next();
        } else {
            /*if there is only one image, draw this image*/
            const simg = document.createElement('img');
            bannerdiv.appendChild(simg);
        }
        return;
    }
}

function loadNavigation(options) {
    /*
        If values in options are null, use default value
    */
    let homeurl = options.homeurl,
        projectsurl = options.projectsurl,
        arturl = options.arturl,
        gamesurl = options.gamesurl,
        twitterurl = options.twitterurl,
        soundcloudurl = options.soundcloudurl;

    artcallback = options.artcallback;
    gamescallback = options.gamescallback;

    /*
     *  NAVIGATION BAR
     */
    const xoff = 0, yoff = 0;

    const nav = document.getElementById('nav');

    let home_option = new MenuOption(
        {
            name: 'HOME',
            url: homeurl || '',
            suboptions: [],
            x: 20 + xoff,
            y: 200 + yoff
        }
    ).render(nav);
    const projects_option = new MenuOption(
        {
            name: 'PROJECTS',
            url: projectsurl || '',
            suboptions: [
                new SubOption({
                    title: 'ART',
                    href: arturl || ''
                }),
                new SubOption({
                    title: 'GAMES',
                    href: gamesurl || ''
                })
            ],
            x: 90 + xoff,
            y: 200 + yoff
        }
    ).render(nav);
    const contact_option = new MenuOption(
        {
            name: '' || 'CONTACT',
            url: '',
            suboptions: [
                new SubOption({
                    title: 'TWITTER',
                    href: twitterurl || 'https://twitter.com/ifrite3'
                }),
                new SubOption({
                    title: 'SOUNDCLOUD',
                    href: soundcloudurl || 'https://soundcloud.com/cuteanimegrill'
                })
            ],
            x: 210 + xoff,
            y: 200 + yoff
        }
    ).render(nav);
}

class Post {
    constructor(options) {
        this.id = options.id;
        this.title = options.title;
        this.content = options.title;
        this.color = options.color;
        this.date = options.date;
    }
    renderPost() {
        id = this.id;
        title = this.title;
        content = this.content;
        color = this.color;
        date = this.date;
    }
}

function loadContent() {

}