function getColorObject(colorString){
  let result = 'invalid';

  if(colorString.includes('rgba')){
    result = getObjectFromRgba(colorString);
  }else if(colorString.includes('rgb')){
    result = getObjectFromRgb(colorString);
  }else if(colorString.includes('hsba')){
    result = getObjectFromHsba(colorString);
  }else if(colorString.includes('hsva')){
    result = getObjectFromHsva(colorString);
  }else if(colorString.includes('hsb')){
    result = getObjectFromHsb(colorString);
  }else if(colorString.includes('hsv')){
    result = getObjectFromHsv(colorString);
  }else if(colorString.includes('hsla')){
    result = getObjectFromHsla(colorString);
  }else if(colorString.includes('hsl')){
    result = getObjectFromHsl(colorString);
  }else if(colorString.includes('cmyk')){
    result = getObjectFromCmyk(colorString);
  }else if(colorString.includes('#')&&colorString.length===4){
    result = getObjectFromShortHex(colorString);
  }else if(colorString.includes('#')&&colorString.length===7){
    result = getObjectFromLongHex(colorString);
  }else{
    throw Error('[Ink] Unknown color type.');
  } //end if
  return result;
} //end getColorObject()

function getObjectFromRgba(colorString){
  let [r,g,b,a] = colorString.replace(/(\(|\)|rgba)/g,'').split(',');

  r = +r|0; //convert to number and floor
  if(isNaN(+r)||typeof r !== 'number'){
    throw Error(`[Ink] Red rgba value is not a valid number. (${r})`);
  } //end if
  if(r<0){
    console.warn(`[Ink] Red rgba value was less than 0. (${r})`);
    console.warn('[Ink] Converting red value to 0...');
    r = 0;
  } //end if
  if(r>255){
    console.warn(`[Ink] Red rgba value was greater than 255. (${r})`);
    console.warn('[Ink] Converting red value to 255...');
    r = 255;
  } //end if
  g = +g|0; //convert to number and floor
  if(isNaN(+g)||typeof g !== 'number'){
    throw Error('[Ink] Green rgba value is not a valid number.');
  } //end if
  if(g<0){
    console.warn(`[Ink] Green rgba value was less than 0. (${g})`);
    console.warn('[Ink] converting green value to 0...');
    g = 0;
  } //end if
  if(g>255){
    console.warn(`[Ink] Green rgba value was greater than 255. (${g})`);
    console.warn('[Ink] Converting green value to 255...');
    g = 255;
  } //end if
  b = +b|0; //convert to number and floor
  if(isNaN(+b)||typeof b !== 'number'){
    throw Error('[Ink] Blue rgba value is not a valid number.');
  } //end if
  if(b<0){
    console.warn(`[Ink] Blur rgba value was less than 0. (${b})`);
    console.warn('[Ink] converting blue value to 0...');
    b = 0;
  } //end if
  if(b>255){
    console.warn(`[Ink] Blue rgba value was greater than 255. (${b})`);
    console.warn('[Ink] Converting blue value to 255...');
    b = 255;
  } //end if
  a = +a; //convert to number

  return {r,g,b,a};
} //end getObjectFromRgba()

function getObjectFromRgb(colorString){
  let [r,g,b] = colorString.replace(/(\(|\)|rgb)/g,'').split(',');

  r = +r|0; //convert to number and floor
  if(isNaN(r)||typeof r !== 'number'){
    throw Error('[Ink] Red rgb value is not a valid number.');
  } //end if
  if(r<0){
    console.warn(`[Ink] Red rgb value was less than 0. (${r})`);
    console.warn('[Ink] Converting red value to 0...');
    r = 0;
  } //end if
  if(r>255){
    console.warn(`[Ink] Red rgb value was greater than 255. (${r})`);
    console.warn('[Ink] Converting red value to 255...');
    r = 255;
  } //end if
  g = +g|0; //convert to number and floor
  if(isNaN(g)||typeof g !== 'number'){
    throw Error('[Ink] Green rgb value is not a valid number.');
  } //end if
  if(g<0){
    console.warn(`[Ink] Green rgb value was less than 0. (${g})`);
    console.warn('[Ink] converting green value to 0...');
    g = 0;
  } //end if
  if(g>255){
    console.warn(`[Ink] Green rgb value was greater than 255. (${g})`);
    console.warn('[Ink] Converting green value to 255...');
    g = 255;
  } //end if
  b = +b|0; //convert to number and floor
  if(isNaN(b)||typeof b !== 'number'){
    throw Error('[Ink] Blue rgb value is not a valid number.');
  } //end if
  if(b<0){
    console.warn(`[Ink] Blue rgb value was less than 0. (${b})`);
    console.warn('[Ink] converting blue value to 0...');
    b = 0;
  } //end if
  if(b>255){
    console.warn(`[Ink] Blue rgb value was greater than 255. (${b})`);
    console.warn('[Ink] Converting blue value to 255...');
    b = 255;
  } //end if
  return {r,g,b,a: 1};
} //end getObjectFromRgb()

function getObjectFromHsva(colorString){
  let [h,s,v,a] = colorString.replace(/(\(|\)|hsba|hsva)/g,'').split(','),
      r, g, b;

  h = +h; //convert to number
  if(isNaN(h)||typeof h !== 'number'){
    throw Error('[Ink] Hue hsv(a)/hsb(a) is not a valid number.');
  } //end if
  if(h>360.0001){
    console.warn(`[Ink] Hue hsv(a)/hsb(a) was greater than 360. (${h})`);
    console.warn(`[Ink] Converting hue value to ${h%360}.`);
    h%=360;
  } //end if
  if(h<0){
    console.warn(`[Ink] Hue hsv(a)/hsb(a) was less than 0. (${h})`);
    console.warn(`[Ink] Converting hue value to ${360+h%360}.`);
    h=360-h%360;
  } //end if
  s = +s; //convert to number
  if(isNaN(s)||typeof s !== 'number'){
    throw Error('[Ink] Saturation hsv(a)/hsb(a) is not a valid number.');
  } //end if
  if(s<0){
    console.warn(`[Ink] Saturation hsv(a)/hsb(a) was less than 0. (${s})`);
    console.warn('[Ink] Converting saturation value to 0...');
    s = 0;
  } //end if
  if(s>1.0001){
    console.warn(`[Ink] Saturation hsv(a)/hsb(a) was greater than 0. (${s})`);
    console.warn('[Ink] Converting saturation value to 1...');
    s = 1;
  } //end if
  v = +v; //convert to number
  if(isNaN(v)||typeof v !== 'number'){
    throw Error('[Ink] Brightness/value hsv(a)/hsb(a) is not a valid number.');
  } //end if
  if(v<0){
    console.warn(`[Ink] Brightness/value hsv(a)/hsb(a) was less than 0. (${v})`);
    console.warn('[Ink] Converting brightness to 0...');
    v = 0;
  } //end if
  if(v>1.0001){
    console.warn(`[Ink] Brightness/value hsv(a)/hsb(a) was greater than 1. (${v})`);
    console.warn('[Ink] Converting brightness to 1...');
    v = 1;
  } //end if
  a = +a;

  let C = v*s,
      X = C*(1 - Math.abs((h/60)%2 - 1)),
      m = v-C,
      loc = (type)=>{
        if(h<60) return Math.round(([C,X,0][type]+m)*255);
        if(h<120) return Math.round(([X,C,0][type]+m)*255);
        if(h<180) return Math.round(([0,C,X][type]+m)*255);
        if(h<240) return Math.round(([0,X,C][type]+m)*255);
        if(h<300) return Math.round(([X,0,C][type]+m)*255);
        return Math.round(([C,0,X][type]+m)*255);
      };

  [r,g,b] = [loc(0),loc(1),loc(2)];
  return {r,g,b,a};
} //end getObjectFromHsva()

function getObjectFromHsv(colorString){
  let [h,s,v] = colorString.replace(/(\(|\)|hsb|hsv)/g,'').split(',');

  return getObjectFromHsva(`hsva(${h},${s},${v},1)`);
} //end getObjectFromHsv()

function getObjectFromHsla(colorString){
  let [h,s,l,a] = colorString.replace(/(\(|\)|hsla)/g,'').split(','),
      r,g,b;

  h = +h|0; //convert to number and floor
  if(isNaN(h)||typeof h !== 'number'){
    throw Error('[Ink] Hue hsl(a) is not a valid number.');
  } //end if
  if(h>360){
    console.warn(`[Ink] Hue hsl(a) was greater than 360. (${h})`);
    console.warn(`[Ink] Converting hue value to ${h%360}.`);
    h%=360;
  } //end if
  if(h<0){
    console.warn(`[Ink] Hue hsl(a) was less than 0. (${h})`);
    console.warn(`[Ink] Converting hue value to ${360+h%360}.`);
    h=360-h%360;
  } //end if
  s = +s; //convert to number
  if(isNaN(s)||typeof s !== 'number'){
    throw Error('[Ink] Saturation hsl(a) is not a valid number.');
  } //end if
  if(s<0){
    console.warn(`[Ink] Saturation hsl(a) was less than 0. (${s})`);
    console.warn('[Ink] Converting saturation value to 0...');
    s = 0;
  } //end if
  if(s>1.0001){
    console.warn(`[Ink] Saturation hsl(a) was greater than 0. (${s})`);
    console.warn('[Ink] Converting saturation value to 1...');
    s = 1;
  }else if(s>1){
    s = 1; //allow some slack in percision w/o warning
  } //end if
  l = +l; //convert to number
  if(isNaN(l)||typeof l !== 'number'){
    throw Error('[Ink] Lightness hsl(a) is not a valid number.');
  } //end if
  if(l<0){
    console.warn(`[Ink] Lightness hsl(a) was less than 0. (${l})`);
    console.warn('[Ink] Converting lightness to 0...');
    l = 0;
  } //end if
  if(l>1.0001){
    console.warn(`[Ink] Lightness hsl(a) was greater than 1. (${l})`);
    console.warn('[Ink] Converting lightness to 1...');
    l = 1;
  }else if(l>1){
    l = 1; //allow some slack in percision w/o warning
  } //end if
  a = +a;

  // given hue (h), saturation (s) and light (l) convert to rgb
  let C = (1 - Math.abs(2*l - 1))*s,
      X = C*(1 - Math.abs(h/60%2 - 1)),
      m = l - C/2,
      loc = (type)=>{
        if(h<60) return Math.round(([C,X,0][type]+m)*255);
        if(h<120) return Math.round(([X,C,0][type]+m)*255);
        if(h<180) return Math.round(([0,C,X][type]+m)*255);
        if(h<240) return Math.round(([0,X,C][type]+m)*255);
        if(h<300) return Math.round(([X,0,C][type]+m)*255);
        return Math.round(([C,0,X][type]+m)*255);
      };

  [r,g,b] = [loc(0),loc(1),loc(2)];
  return {r,g,b,a};
} //end getObjectFromHsla()

function getObjectFromCmyk(colorString){
  let [c,m,y,k] = colorString.replace(/(\(|\)|cmyk)/g,'').split(',');

  c = +c; //convert to number
  if(isNaN(c)||typeof c !== 'number'){
    throw Error('[Ink] Cyan cmyk is not a valid number.');
  } //end if
  if(c<0){
    console.warn(`[Ink] Cyan cmyk was less than 0. (${c})`);
    console.warn('[Ink] Converting cyan value to 0...');
    c = 0;
  } //end if
  if(c>1.0001){
    console.warn(`[Ink] Cyan cmyk was greater than 1. (${c})`);
    console.warn('[Ink] Converting cyan value to 1.');
    c = 1;
  }else if(c>1){
    c = 1; //allow some off-precision without warning
  } //end if
  m = +m; //convert to number
  if(isNaN(m)||typeof m !== 'number'){
    throw Error('[Ink] Magenta cmyk is not a valid number.');
  } //end if
  if(m<0){
    console.warn(`[Ink] Magenta cmyk was less than 0. (${m})`);
    console.warn('[Ink] Converting magenta value to 0...');
    m = 0;
  } //end if
  if(m>1.0001){
    console.warn(`[Ink] Magenta cmyk was greater than 1 (${m}).`);
    console.warn('[Ink] Converting magenta value to 1.');
    m = 1;
  }else if(m>1){
    m = 1; //allow some off-precision without warning
  } //end if
  y = +y; //convert to number
  if(isNaN(y)||typeof y !== 'number'){
    throw Error('[Ink] Yellow cmyk is not a valid number.');
  } //end if
  if(m<0){
    console.warn(`[Ink] Yellow cmyk was less than 0. (${m})`);
    console.warn('[Ink] Converting yellow value to 0...');
    y = 0;
  } //end if
  if(y>1.0001){
    console.warn(`[Ink] Yellow cmyk was greater than 1. (${y})`);
    console.warn('[Ink] Converting yellow value to 1.');
    y = 1;
  }else if(y>1){
    y = 1; //allow some off-precision without warning
  } //end if
  k = +k; //convert to number
  if(isNaN(k)||typeof k !== 'number'){
    throw Error('[Ink] Black cmyk is not a valid number.');
  } //end if
  if(k<0){
    console.warn(`[Ink] Black cmyk was less than 0. (${k})`);
    console.warn('[Ink] Converting black value to 0...');
    k = 0;
  } //end if
  if(k>1.0001){
    console.warn(`[Ink] Black cmyk was greater than 1. (${k})`);
    console.warn('[Ink] Converting black value to 1.');
    k = 1;
  }else if(k>1){
    k = 1; //allow some off-precision without warning
  } //end if
  return {r: 255*(1-c)*(1-k),g: 255*(1-m)*(1-k),b: 255*(1-y)*(1-k),a: 1};
} //end getObjectFromCmyk()

function getObjectFromHsl(colorString){
  let [h,s,l] = colorString.replace(/(\(|\)|hsl)/g,'').split(',');

  return getObjectFromHsla(`hsla(${h},${s},${l},1)`);
} //end getObjectFromHsl()

function getObjectFromShortHex(colorString){
  if(colorString[0]!=='#'){
    throw Error('[Ink] Invalid short hex format.');
  } //end if
  if(isNaN(parseInt(colorString.substr(1,3),16))){
    throw Error('[Ink] Invalid characters in short hex color.');
  } //end if
  return {
    r: parseInt(colorString.substr(1,1)+colorString.substr(1,1),16),
    g: parseInt(colorString.substr(2,1)+colorString.substr(2,1),16),
    b: parseInt(colorString.substr(3,1)+colorString.substr(3,1),16),
    a: 1
  };
} //end getObjectFromShortHex()

function getObjectFromLongHex(colorString){
  if(colorString[0]!=='#'){
    throw Error('[Ink] Invalid long hex format.');
  } //end if
  if(isNaN(parseInt(colorString.substr(1,6),16))){
    throw Error('[Ink Invalid characters in long hex color.');
  } //end if
  return {
    r: parseInt(colorString.substr(1,2),16),
    g: parseInt(colorString.substr(3,2),16),
    b: parseInt(colorString.substr(5,2),16),
    a: 1
  };
} //end getObjectFromLongHex()

function getRgbaFromObject(object){
  return `rgba(${object.r},${object.g},${object.b},${object.a})`;
} //end getRgbaFromObject()

function getRgbFromObject(object){
  return `rgb(${object.r},${object.g},${object.b})`;
} //end getRgbFromObject()

function getHsvaFromObject({r,g,b,a}){
  r/=255;g/=255;b/=255; //eslint-disable-line no-param-reassign
  let min = Math.min(r,g,b),
      max = Math.max(r,g,b),
      delta = max - min,
      h,s,v = max;

  if(max!==0){
    s = delta / max;
    if(r===max){
      h = (g-b) / delta;
    }else if(g===max){
      h = 2+(b-4)/delta;
    }else{
      h=4+(r-g)/delta;
    } //end if
    h*=60;
    if(h<0) h+= 360;
    if(isNaN(h)) h = 0;
  }else{
    h = 0; s = 0; v = 0; //return
  } //end if
  return `hsva(${h},${s},${v},${a})`;
} //end getHsvaFromObject()

function getHsvFromObject(object){
  let colorString =  getHsvaFromObject(object),
      [h,s,v] = colorString.replace(/(\(|\)|hsva)/g,'').split(',');

  return `hsv(${h},${s},${v})`;
} //end getHsvFromObject()

function getHsbaFromObject(object){
  let colorString =  getHsvaFromObject(object),
      [h,s,b,a] = colorString.replace(/(\(|\)|hsva)/g,'').split(',');

  return `hsba(${h},${s},${b},${a})`;
} //end getHsbaFromObject()

function getHsbFromObject(object){
  let colorString =  getHsvaFromObject(object),
      [h,s,b] = colorString.replace(/(\(|\)|hsva)/g,'').split(',');

  return `hsba(${h},${s},${b})`;
} //end getHsbFromObject()

function getCmykFromObject({r,g,b,a}){
  r/=255;g/=255;b/=255; //eslint-disable-line no-param-reassign
  let k = 1 - Math.max(r,g,b),
      c = (1 - r - k)/(1-k),
      m = (1 - g - k)/(1-k),
      y = (1 - b - k)/(1-k);

  return `cmyk(${c},${m},${y},${k})`;
} //end getCmykFromObject()

function getHslaFromObject({r,g,b,a}){
  r/=255;g/=255;b/=255; //eslint-disable-line no-param-reassign
  let max = Math.max(r,g,b),
      min = Math.min(r,g,b),
      delta = max-min,
      h,s,l=(max+min)/2;

  // make sure it's not achromatic (gray)
  if(!delta){
    h = s = 0;
  }else{
    s = delta/(1-Math.abs(2*l-1));
    if(max===r){
      h = 60*(((g-b)/delta)%6);
    }else if(max===g){
      h = 60*((b-r)/delta+2);
    }else{ //max===b
      h = 60*((r-g)/delta+4);
    } //end if
    if(h<0) h = 360+h;
  } //end if
  return `hsla(${h},${s},${l},${a})`;
} //end getHslaFromObject()

function getHslFromObject(object){
  let colorString = getHslaFromObject(object),
      [h,s,l] = colorString.replace(/(\(|\)|hsla)/g,'').split(',');

  return `hsl(${h},${s},${l})`;
} //end getHslFromObject()

function getHexFromObject(object){
  let r = object.r.toString(16).padStart(2,'0'),
      g = object.g.toString(16).padStart(2,'0'),
      b = object.b.toString(16).padStart(2,'0');

  return `#${r}${g}${b}`;
} //end getHexFromObject()

export function ink(colorString,{...options}={}){
  let {r,g,b,a} = getColorObject(colorString);

  // start with validation
  if(isNaN(a)||typeof a !== 'number'){
    throw Error('[Ink] Alpha value is not a valid number.');
  } //end if
  if(a<0){
    console.warn(`[Ink] Alpha was less than 0. (${a})`);
    console.warn('[Ink] Converting alpha to 0...');
    a = 0;
  } //end if
  if(a>1.0001){
    console.warn(`[Ink] Alpha was greater than 1. (${a})`);
    console.warn('[Ink] Converting alpha to 1...');
    a = 1;
  }else if(a>1){
    a = 1; //allow some off-precision without warning
  } //end if
  if(options.r&&typeof options.r !== 'number'||options.r&&isNaN(options.r)){
    throw Error('[Ink] Red color weight is not a number.');
  } //end if
  if(options.r&&options.r<0){
    throw Error('[Ink] Red color weight must be greater than 0.');
  } //end if
  if(options.g&&typeof options.g !== 'number'||options.g&&isNaN(options.g)){
    throw Error('[Ink] Green color weight is not a number.');
  } //end if
  if(options.g&&options.g<0){
    throw Error('[Ink] Green color weight must be greater than 0.');
  } //end if
  if(options.b&&typeof options.b !== 'number'||options.b&&isNaN(options.b)){
    throw Error('[Ink] Blue color weight is not a number.');
  } //end if
  if(options.b&&options.b<0){
    throw Error('[Ink] Blue color weight must be greater than 0.');
  } //end if
  if(options.l&&typeof options.l !== 'number'||options.l&&isNaN(options.l)){
    throw Error('[Ink] Lightness weight is not a number.');
  } //end if
  if(options.s&&typeof options.s !== 'number'||options.s&&isNaN(options.s)){
    throw Error('[Ink] Saturation weight is not a number.');
  } //end if
  if(options.r<0||options.g<0||options.b<0||options.r>1||options.g>1||options.b>1){
    throw Error('[Ink] Color weights must be inclusively between 0 and 1.');
  } //end if
  if(options.a<0||options.a>1){
    throw Error('[Ink] Color alpha must be inclusively between 0 and 1.');
  } //end if
  if(options.minLightness&&typeof options.minLightness !== 'number'){
    throw Error('[Ink] Min lightness is not a number.');
  }else if(options.minLightness&&isNaN(options.minLightness)){
    throw Error('[Ink] Min lightness is not a number.');
  } //end if
  if(options.maxLightness&&typeof options.maxLightness !== 'number'){
    throw Error('[Ink] Max lightness is not a number.');
  }else if(options.maxLightness&&isNaN(options.maxLightness)){
    throw Error('[Ink] Max lightness is not a number.');
  } //end if
  if(options.lightness&&typeof options.lightness !== 'number'){
    throw Error('[Ink] lightness is not a number.');
  }else if(options.lightness&&isNaN(options.lightness)){
    throw Error('[Ink] lightness is not a number.');
  } //end if
  if(options.minSaturation&&typeof options.minSaturation !== 'number'){
    throw Error('[Ink] Min saturation is not a number.');
  }else if(options.minSaturation&&isNaN(options.minSaturation)){
    throw Error('[Ink] Min saturation is not a number.');
  } //end if
  if(options.maxSaturation&&typeof options.maxSaturation !== 'number'){
    throw Error('[Ink] Max saturation is not a number.');
  }else if(options.maxSaturation&&isNaN(options.maxSaturation)){
    throw Error('[Ink] Max saturation is not a number.');
  } //end if
  if(options.saturation&&typeof options.saturation !== 'number'){
    throw Error('[Ink] Saturation is not a number.');
  }else if(options.saturation&&isNaN(options.saturation)){
    throw Error('[Ink] Saturation is not a number.');
  } //end if
  if(options.object&&typeof options.object !== 'boolean'){
    throw Error('[Ink] Object output parameter value is not a boolean.');
  } //end if
  if(options.minSaturation>options.maxSaturation){
    console.warn('[Ink] Min saturation must be smaller than max saturation.');
    console.warn('[Ink] Switching min and max saturations...');
    [options.minSaturation,options.maxSaturation] = [options.maxSaturation,options.minSaturation];
  } //end if
  if(options.minLightness>options.maxLightness){
    console.warn('[Ink] Min lightness must be smaller than max lightness.');
    console.warn('[Ink] Switching min and max lightness...');
    [options.minLightness,options.maxLightness] = [options.maxLighntess,options.minLightness];
  } //end if
  if(options.minLightness&&options.lightness||options.maxLightness&&options.lightness){
    console.warn('[Ink] Cannot have lightness setting and a threshold.');
    console.warn('[Ink] Ignoring lightness threshold...');
    delete options.minLightness;
    delete options.maxLightness;
  } //end if
  if(options.minSaturation&&options.saturation||options.maxSaturation&&options.saturation){
    console.warn('[Ink] Cannot have saturation setting and a threshold.');
    console.warn('[Ink] Ignoring saturation threshold...');
    delete options.minSaturation;
    delete options.maxSaturation;
  } //end if
  if(options.maxLightness&&options.minLightness&&options.maxLightness-options.minLightness<0.01){
    console.warn('[Ink] Max and min lightness threshold too close.');
    console.warn('[Ink] Removing lightness threshold and using hard setting...');
    options.lightness = options.minLightness;
    delete options.minLightness;
    delete options.maxLightness;
  } //end if
  if(options.minSaturation&&options.maxSaturation&&options.maxSaturation-options.minSaturation<0.01){
    console.warn('[Ink] Max and min saturation threshold too close.');
    console.warn('[Ink] Removing saturation threshold and using hard setting...');
    options.saturation = options.minSaturation;
    delete options.minSaturation;
    delete options.maxSaturation;
  } //end if

  if(options.r){
    r = Math.floor(options.r*r);
    if(r>255) r = 255;
  } //end if
  if(options.g){
    g = Math.floor(options.g*g);
    if(g>255) g = 255;
  } //end if
  if(options.b){
    b = Math.floor(options.b*b);
    if(b>255) b = 255;
  } //end if
  if(options.a) a = options.a;
  if(options.l){
    let [h,s,l] = getHslFromObject({r,g,b}).replace(/(\(|\)|hsl)/g,'').split(',');

    l=+l; //convert to number
    l+=options.l;
    ({r,g,b} = getObjectFromHsl(`hsl(${h},${s},${l})`));
  } //end if
  if(options.s){
    let [h,s,l] = getHslFromObject({r,g,b}).replace(/(\(|\)|hsl)/g,'').split(',');

    s=+s; //convert to number
    s+=+options.s;
    ({r,g,b} = getObjectFromHsl(`hsl(${h},${s},${l})`));
  } //end if
  if(options.minLightness||options.maxLightness||options.lightness){
    let [h,s,l] = getHslFromObject({r,g,b}).replace(/(\(|\)|hsl)/g,'').split(',');

    if(options.minLightness&&l<options.minLightness) l = options.minLightness;
    if(options.maxLightness&&l>options.maxLightness) l = options.maxLightness;
    if(options.lightness&&+l!==options.lightness) l = options.lightness;
    ({r,g,b} = getObjectFromHsl(`hsl(${h},${s},${l})`));
  } //end if
  if(options.minSaturation||options.maxSaturation||options.saturation){
    let [h,s,l] = getHslFromObject({r,g,b}).replace(/(\(|\)|hsl)/g,'').split(',');

    if(options.minSaturation&&s<options.minSaturation) s = options.minSaturation;
    if(options.maxSaturation&&s>options.maxSaturation) s = options.maxSaturation;
    if(options.saturation&&+s!==options.saturation) s = options.saturation;
    ({r,g,b} = getObjectFromHsl(`hsl(${h},${s},${l})`));
  } //end if
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = a.toFixed(3);

  // now we'll acquire the result
  let result;

  if(options.format&&options.format==='object'){
    result = {r,g,b,a};
  }else if(options.format&&options.format==='hex'){
    result = getHexFromObject({r,g,b});
  }else if(options.format&&options.format==='hsl'){
    result = getHslFromObject({r,g,b});
  }else if(options.format&&options.format==='hsla'){
    result = getHslaFromObject({r,g,b,a});
  }else if(options.format&&options.format==='hsv'){
    result = getHsvFromObject({r,g,b});
  }else if(options.format&&options.format==='hsva'){
    result = getHsvaFromObject({r,g,b,a});
  }else if(options.format&&options.format==='hsb'){
    result = getHsbFromObject({r,g,b});
  }else if(options.format&&options.format==='hsba'){
    result = getHsbaFromObject({r,g,b,a});
  }else if(options.format&&options.format==='rgb'){
    result = getRgbFromObject({r,g,b});
  }else if(options.format&&options.format==='cmyk'){
    result = getCmykFromObject({r,g,b});
  }else{ //rgba
    result = getRgbaFromObject({r,g,b,a});
  } //end if
  return result;
} //end ink()

export function convert2rgba(colorString){
  return getRgbaFromObject(getColorObject(colorString));
} //end convert2rgba()

export function convert2rgb(colorString){
  return getRgbFromObject(getColorObject(colorString));
} //end convert2rgb()

export function convert2hsba(colorString){
  return getHsbaFromObject(getColorObject(colorString));
} //end convert2hsba()

export function convert2hsva(colorString){
  return getHsvaFromObject(getColorObject(colorString));
} //end convert2hsva()

export function convert2hsb(colorString){
  return getHsbFromObject(getColorObject(colorString));
} //end convert2hsb()

export function convert2hsv(colorString){
  return getHsvFromObject(getColorObject(colorString));
} //end convert2hsv()

export function convert2hsla(colorString){
  return getHslaFromObject(getColorObject(colorString));
} //end convert2hsla()

export function convert2hsl(colorString){
  return getHslFromObject(getColorObject(colorString));
} //end convert2hsl()

export function convert2hex(colorString){
  return getHexFromObject(getColorObject(colorString));
} //end convert2hex()

export function convert2cmyk(colorString){
  return getCmykFromObject(getColorObject(colorString));
} //end convert2cmyk()
