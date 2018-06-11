
const height = 2.3;

function calculateHeight(percentage){
    const cHeight=document.body.clientHeight;
    return cHeight*(percentage/100);
}
class MenuOption{
    constructor(title,href,items=[],x,y){
        this.title=title;
        this.href=href;
        this.items=items;
        this.x=x;
        this.y=y;
    }
    create(parentElement){
        const items=this.items;
        const max=items.length;
        const x=this.x,y=this.y;
        const href=this.href;
        /*main MenuOption*/
        let menuoption=document.createElement('div');menuoption.innerText=this.title;
        menuoption.classList.add('MenuOption');
        menuoption.setAttribute('style','height:'+height+'%;left:'+x+'%;top:'+y+'%;');
        parentElement.appendChild(menuoption);
        let menuops=[];
        if(items.length>0){
            /*SubOption elements*/
            for(let i=0;i<items.length;i++){
                const target=items[i];
                const suboption=target.create(i, menuoption,x,y);
                menuoption.appendChild(suboption);
                menuops[i]=suboption;
            }
        }
        /*if href field of main button is not empty, then make main button link to that href*/
        if(this.href!=''){$(menuoption).click(function(){window.location.href=href;});}
        $(menuoption).hover(function(){
            /*make all suboptions interactable, and visible.*/
            $(menuoption).css('height', (max+1)*height+'%');$(menuoption).css('color', '#aaa');
            for(let i=0;i<menuops.length;i++){
                /*make all suboptions interactable, and visible.*/
                const target=menuops[i];
                target.style.opacity=1;target.style.top=y+(height*i)+height+'%';
                $(target).css('pointer-events', 'all');
            }
        },function(){
            /*make all suboptions interactable, and visible.*/
            $(menuoption).css('height', height+'%');
            $(menuoption).css('color', 'black');
            for(let i=0;i<menuops.length;i++){
                /*make all suboptions uninteractable, and invisible.*/
                var target=menuops[i];
                target.style.opacity=0;
                target.style.top=y+(height*i)+height+1+'%';
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
    create(index,parent,x,y){
        const href=this.href,title=this.title;
        const buffer=0.5;
        const mh=(index*height)+height;
        this.originalheight=y+mh+buffer;
        /*suboption element*/
        const suboption=document.createElement('div');suboption.classList.add('SubOption');suboption.innerText=title;
        /*if href field is not empty, then make menu option link to that href*/
        $(suboption).css('left',x+'%');$(suboption).css('top',this.originalheight+1+'%');$(suboption).css('width',parent.offsetWidth);$(suboption).css('opacity', 0);
        $(suboption).css('transition', 'color 0.1s, opacity 0.5s, top 0.8s');
        if(href!=''){suboption.addEventListener('click', function() {window.location.href=href;});}
        parent.appendChild(suboption);return suboption;
    }
}
$(document).ready(function() {
    const xoff=2,yoff=20;
    /* init nav bar*/
    const nav=document.getElementById('nav'); 
    const home=new MenuOption('HOME',"/",[],40+xoff,50+yoff).create(nav);
    const contact=new MenuOption('CONTACT','',[
            new SubOption('twitter', 'https://twitter.com/ifrite3'), 
            new SubOption('soundcloud')], 
        44+xoff, 50+yoff).create(nav);
    const art=new MenuOption('PROJECTS','',[
        new SubOption('art'), 
        new SubOption('games', 'games')
        // ,new SubOption('saboteur', 'saboteur')
    ],
    50+xoff, 50+yoff).create(nav);
});