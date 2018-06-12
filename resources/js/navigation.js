const height = 1;

class Fader{
    constructor() {
        this.fadeElement=document.createElement('div');
    }
    render(){
        let fadeElement=this.fadeElement;
        fadeElement.classList.add('fader');
        $(fadeElement).css('transition', 'left 0.5s');
        $('body').append(fadeElement);
    }
    fadeout(){
        let fadeElement=this.fadeElement;
        $(fadeElement).css('left', '0%');
    }
    fadein(){
        let fadeElement=this.fadeElement;
        $(fadeElement).css('left', '-100%');
    }
}
let fader=new Fader();

class MenuOption{
    constructor(title,href,items=[],x,y){
        this.title=title;
        this.href=href;
        this.items=items;
        this.x=x;
        this.y=y;
    }
    render(parentElement){
        const items=this.items;
        const max=items.length;
        const x=this.x,y=this.y;
        const href=this.href;
        /*main MenuOption*/
        let menuoption=document.createElement('div');menuoption.innerText=this.title;
        menuoption.classList.add('menuoption');
        menuoption.setAttribute('style','height:1em;right:'+x+'rem;top:'+y+'rem;');
        parentElement.appendChild(menuoption);
        let menuops=[];
        if(items.length>0){
            /*SubOption elements*/
            for(let i=0;i<items.length;i++){
                const target=items[i];
                const suboption=target.render(i, menuoption,x,y);
                menuoption.appendChild(suboption);
                menuops[i]=suboption;
            }
        }
        /*if href field of main button is not empty, then make main button link to that href*/
        if(this.href!=''){$(menuoption).click(function(){
            fader.fadeout();
            fader.fadeElement.addEventListener('transitionend', (event)=>{
                window.location.href=href;
            })
        });}

        /* 
        
        hover

        */

        $(menuoption).hover(function(){
            $(menuoption).css('height', (max+1)*height+'em');
            $(menuoption).css('color', '#ddd');
            for(let i=0;i<menuops.length;i++){
                const target=menuops[i];
                target.style.opacity=1;
                target.style.top=y+(height*(i*1.5))+2+'rem';
                $(target).css('pointer-events', 'all');
            }
        },function(){
            $(menuoption).css('height', height+'em');
            $(menuoption).css('color', '#777');
            for(let i=0;i<menuops.length;i++){
                var target=menuops[i];
                target.style.opacity=0;
                target.style.top=y+((height*2)*i)+height+3+'rem';
                $(target).css('pointer-events', 'none');
            }
        });
        return this;
    }
}
class SubOption{
    constructor(title,href=''){
        this.title=title;
        this.href=href;
        this.originalheight='';
    }
    render(index,parent,x,y){
        const href=this.href,title=this.title;
        const mh=(index*(height*2))+2;
        this.originalheight=y+mh;
        /*suboption element*/
        const suboption=document.createElement('div');
        suboption.classList.add('suboption');
        suboption.innerText=title;
        /*if href field is not empty, then make menu option link to that href*/
        $(suboption).css('right',x+'rem');
        $(suboption).css('top',this.originalheight+3+'rem');
        $(suboption).css('width',$(parent).width());
        $(suboption).css('text-align','right');

        $(suboption).css('opacity', 0);
        $(suboption).css('transition', 'color 0.1s, opacity 0.2s, top 0.5s');
        if(href!=''){suboption.addEventListener('click', function() {
            //animate, then window.location.href=href;
            fader.fadeout();
            fader.fadeElement.addEventListener('transitionend', (event)=>{
                window.location.href=href;
            })
        });}
        parent.appendChild(suboption);return suboption;
    }
}

$(document).ready(function() {
    fader.render();
    setTimeout(() => {
        fader.fadein(); 
    }, 100);

    const xoff=-1,yoff=0;
    /* init nav bar*/
    const nav=document.getElementById('nav'); 
    const home=new MenuOption('HOME',"/",[],23+xoff,20+yoff).render(nav);
    const art=new MenuOption('PROJECTS','',[
        new SubOption('art'), 
        new SubOption('games', 'games')
    ],
    13+xoff, 20+yoff).render(nav);
    const contact=new MenuOption('CONTACT','',[
            new SubOption('twitter', 'https://twitter.com/ifrite3'), 
            new SubOption('soundcloud')], 
        3+xoff, 20+yoff).render(nav);

});