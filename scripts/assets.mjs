// Recorta las maquetas de /reference y genera las imágenes del sitio (coordenadas sobre 1536x1024).
import sharp from 'sharp';
import { mkdirSync } from 'fs';
const O = 'src/public/img/'; mkdirSync(O, { recursive: true });
// [salida, archivo, left, top, ancho, alto, ancho final, invertir]
const J = [
['hero','raw.png',0,0,725,395,1600],
['banner','mood-2.png',722,283,541,188,1400],
['sunset','mood-2.png',1176,760,360,264,900],
['core-tee','mood-2.png',10,505,155,210,600],['core-hoodie','mood-2.png',150,505,145,210,600],
['core-cap','mood-2.png',288,560,100,130,600],['core-pant','mood-2.png',372,505,105,215,600],
['raw-tee','raw.png',10,415,262,260,700],['raw-hoodie','raw.png',265,415,205,260,700],
['raw-deck','raw.png',862,400,200,280,700],['raw-label','raw.png',1250,395,286,285,700],
['raw-pack','raw.png',470,740,430,205,900],['raw-stickers','raw.png',900,735,255,215,700],
['raw-gig','raw.png',0,722,280,225,700],['raw-wall','raw.png',285,722,175,225,700],
['long-skull','escaparate.png',95,10,195,725,700],['long-wood','escaparate.png',855,10,185,725,700],
['long-low','escaparate.png',0,765,1140,259,1400],['long-wheel','escaparate.png',1150,0,386,365,800],
['long-skullwood','escaparate.png',1150,625,386,399,800],
['logo','logo-bn.png',55,215,660,570,900,1],['mark','logo-bn.png',185,220,395,395,500,1]];
for (const [o,f,l,t,w,h,W,neg] of J) {
  const m = await sharp('reference/'+f).metadata(), sx = m.width/1536, sy = m.height/1024;
  let s = sharp('reference/'+f).extract({left:Math.round(l*sx),top:Math.round(t*sy),width:Math.round(w*sx),height:Math.round(h*sy)});
  if (neg) s = s.negate({alpha:false});
  await s.resize({width:W,withoutEnlargement:true}).jpeg({quality:80}).toFile(O+o+'.jpg');
}
console.log(J.length+' imágenes generadas');
