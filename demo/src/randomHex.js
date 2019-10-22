// generate a random hex color
export function randomHex(){
  let l = '0123456789abcdef'.split(''),
      c = '#';

  for(let i=0;i<6;i++) c+= l[Math.floor(Math.random()*15)];
  return c;
} //end randomHex()
