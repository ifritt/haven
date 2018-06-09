
const height = 2.3;
function calculateHeight(percentage){
    const cHeight=document.body.clientHeight;
    return cHeight*(percentage/100);
}
class NavObject{
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
        /*main navobject*/
        let mainbutton=document.createElement('div');mainbutton.innerText=this.title;
        mainbutton.classList.add('navObject');
        mainbutton.setAttribute('style','height:'+height+'%;left:'+x+'%;top:'+y+'%;');
        parentElement.appendChild(mainbutton);
        let menuops=[];
        if(items.length>0){
            /*menuobject elements*/
            for(let i=0;i<items.length;i++){
                const target=items[i];
                const menuoption=target.create(i, mainbutton,x,y);
                mainbutton.appendChild(menuoption);
                menuops[i]=menuoption;
            }
        }
        /*if href field of main button is not empty, then make main button link to that href*/
        if(this.href!=''){$(mainbutton).click(function(){window.location.href=href;});}
        $(mainbutton).hover(function(){
            /*make all menuoptions interactable, and visible.*/
            $(mainbutton).css('height', (max+1)*height+'%');$(mainbutton).css('color', '#aaa');
            for(let i=0;i<menuops.length;i++){
                /*make all menuoptions interactable, and visible.*/
                const target=menuops[i];
                target.style.opacity=1;target.style.top=y+(height*i)+height+'%';
                $(target).css('pointer-events', 'all');
            }
        },function(){
            /*make all menuoptions interactable, and visible.*/
            $(mainbutton).css('height', height+'%');
            $(mainbutton).css('color', 'black');
            for(let i=0;i<menuops.length;i++){
                /*make all menuoptions uninteractable, and invisible.*/
                var target=menuops[i];
                target.style.opacity=0;
                target.style.top=y+(height*i)+height+1+'%';
                $(target).css('pointer-events', 'none');
            }
        });
        return this;
    }
}
class MenuObject{
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
        /*menuoption element*/
        const menuoption=document.createElement('div');menuoption.classList.add('menuObject');menuoption.innerText=title;
        /*if href field is not empty, then make menu option link to that href*/
        $(menuoption).css('left',x+'%');$(menuoption).css('top',this.originalheight+1+'%');$(menuoption).css('width',parent.offsetWidth);$(menuoption).css('opacity', 0);
        $(menuoption).css('transition', 'color 0.1s, opacity 0.5s, top 0.8s');
        if(href!=''){menuoption.addEventListener('click', function() {window.location.href=href;});}
        parent.appendChild(menuoption);return menuoption;
    }
}
$(document).ready(function() {
    const xoff=2,yoff=20;
    /* init nav bar*/
    const nav=document.getElementById('nav'); 
    const home=new NavObject('HOME',"test.html",[],40+xoff,50+yoff).create(nav);
    const contact=new NavObject('CONTACT','',[
            new MenuObject('twitter', 'http://twitter.com/'), 
            new MenuObject('soundcloud')], 
        44+xoff, 50+yoff).create(nav);
    const art=new NavObject('PROJECTS','',[
        new MenuObject('art'), 
        new MenuObject('games', 'games')
        // ,new MenuObject('saboteur', 'saboteur')
    ],
    50+xoff, 50+yoff).create(nav);
});