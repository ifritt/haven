
class Banner{
    constructor(images=[],links=[],yoffset=[]){
        this.images=images;
        this.links=links;
        this.yoffset=yoffset
        this.delayms=4000;
    }
    nextImage(){
    }
    create(){
        const delayms=this.delayms;
        const images=this.images;
        const yoffset=this.yoffset;
        let ilist=[];
        /*maximum size*/
        const maxwidth=document.body.clientWidth;
        const bannerdiv=document.getElementById('banner');
        console.log(bannerdiv.offsetWidth);
        /*center it*/
        // bannerdiv.style.left=bannerdiv.offsetWidth/2+'px';
        bannerdiv.style.left='0px';
        bannerdiv.style.width='100%';
        /*if there is more than one image, then shuffle through them*/
        if(images.length>1){
            /*create one image for every image in array*/
            for(let i=0;i<images.length;i++){
                const img=document.createElement('img');
                const image=new Image();
                image.src=images[i];
                img.src=images[i];
                img.style.position='absolute';
                img.style.top=yoffset[i];
                img.style.minWidth='100%';
                img.style.maxWidth='100%';
                img.style.minHeight='auto';
                img.style.maxHeight='auto';
                img.style.opacity='1';
                img.style.transition='opacity 1s';
                img.setAttribute('index', i);
                bannerdiv.appendChild(img);
                ilist[i]=img;
            }
            let current=0;
            function next(){
                setTimeout(next, delayms);
                for(let i=0;i<ilist.length;i++){
                    if(ilist[i].getAttribute('index')==current){
                        ilist[i].style.opacity=1;
                    }else{
                        ilist[i].style.opacity=0;
                    }
                }
                current++;
                if(current>=ilist.length)current=0;
            }
            next();
        }else{
            /*if there is only one image, draw this image*/
            const simg=document.createElement('img');
            bannerdiv.appendChild(simg);
        }
        return;
    }
}

$(document).ready(function(){
    const imgs=[
        'img/0.png',
        'img/1.jpg',
        'img/2.jpg'
    ];
    const yoffset=[
        '-120%',
        '-120%',
        '-120%'
    ]
    const urls=[
        'https://www.sfdept.tokyo/'
    ];
    const bannerObject=new Banner(imgs,urls,yoffset).create();
});