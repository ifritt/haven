
class Banner{
    constructor(images=[],yoffset=[]){
        this.images=images;
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
                img.setAttribute('style', 'position:absolute;top:'+yoffset[i]+';min-width:100%;max-width:100%;min-height:auto;max-height:auto;opacity:1;transition:opacity 1s;')
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
    /*relation to index.html*/
    const imgs=['../resources/img/0.png','../resources/img/1.jpg','../resources/img/2.jpg'];
    const yoffset=['-265%','-265%','-245%']
    const bannerObject=new Banner(imgs,yoffset).create();
});