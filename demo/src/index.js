import './index.styl';
import {Easel} from '@ion-cloud/easel';
import {ink} from '../../index';
import {randomHex} from './randomHex';
export const easel = new Easel();

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
const noscript = document.querySelector('noscript');

if(!easel.activated){
  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  let ctx = easel.ctx,
      v = easel.viewport,
      color = {cur: randomHex(), tar: randomHex()};

  noscript.style.visibility='hidden';
  easel.config = ()=>{
    ctx.fontRatio = 0.2;
    ctx.textAlign = 'center';
    ctx.fontSize = Math.min(v.w,v.h)*ctx.fontRatio;
    ctx.font = `${ctx.fontSize}px Impact, Charcoal, sans-serif`;
  };
  easel.onDraw = ()=>{
    ctx.fillStyle = ink(color.cur,1,0.3,0.4);
    ctx.fillRect(0,0,v.w,v.h);
    ctx.fillStyle = ink(color.cur,1,0.5,0.6);
    ctx.fillText(color.cur,v.w/2,v.h/2+ctx.fontSize/4);
  };

  (function main(){
    if(color.cur!==color.tar){
      let c = ink(color.cur,{format: 'object'}),
          t = ink(color.tar,{format: 'object'});

      c.r=c.r<t.r?++c.r:c.r>t.r?--c.r:c.r;
      c.g=c.g<t.g?++c.g:c.g>t.g?--c.g:c.g;
      c.b=c.b<t.b?++c.b:c.b>t.b?--c.b:c.b;
      color.cur=`#${[c.r,c.g,c.b].map(x=>x.toString(16)).map(x=>x.length<2?`0${x}`:x).join('')}`;
      if(!(c.r^t.r&&c.g^t.g&&c.b^t.b))color.tar=randomHex();
    }else{
      color.tar=randomHex();
    } //end if
    easel.redraw();
    setTimeout(main,100);
  }());
} //end if
