const R=window.RB,$=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const eur=n=>'€'+n.toFixed(2).replace('.',',').replace(',00','');
const P=s=>R.products.find(p=>p.slug==s);
let C=[];try{C=JSON.parse(localStorage.getItem('rb')||'[]')}catch{}
const save=()=>{try{localStorage.setItem('rb',JSON.stringify(C))}catch{}draw()};
function draw(){
  const n=C.reduce((a,i)=>a+i.q,0),sub=C.reduce((a,i)=>a+P(i.s).price*i.q,0),sh=!sub||sub>=R.free?0:R.ship;
  $('#cn').textContent=n;$('#tot').textContent=eur(sub+sh);$('#bar').style.width=Math.min(100,sub/R.free*100)+'%';
  $('#fr').textContent=sub>=R.free?'Envío gratis conseguido':'Te faltan '+eur(R.free-sub)+' para envío gratis';
  $('#lines').innerHTML=C.length?C.map((i,x)=>{const p=P(i.s);return `<div class="ln"><img src="${R.base}/img/${p.img}.jpg" alt=""><div><b>${p.name}</b><small>${i.z?'Talla '+i.z:''}</small><button data-q="${x}" data-d="-1" aria-label="Menos">−</button> ${i.q} <button data-q="${x}" data-d="1" aria-label="Más">+</button></div><b>${eur(p.price*i.q)}</b></div>`}).join(''):'<p class="g">Vacía. Empieza por la tienda.</p>';
  const body=C.map(i=>`${i.q} x ${P(i.s).name} ${i.z||''}`).join('\n')+'\nTotal: '+eur(sub+sh);
  $('#co').href=C.length?`mailto:${R.email}?subject=${encodeURIComponent('Pedido Rockbones')}&body=${encodeURIComponent(body)}`:'#';
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-add],[data-q],[data-open],[data-close],.sz');if(!t)return;
  if(t.matches('.sz')){$$('.sz').forEach(b=>b.classList.toggle('on',b==t));return}
  if(t.dataset.add!==undefined){e.preventDefault();const p=P(t.dataset.add),z=$('.sz.on')?.dataset.z||p.sizes[1]||p.sizes[0]||'';
    const k=C.find(i=>i.s==p.slug&&i.z==z);k?k.q++:C.push({s:p.slug,z,q:1});save();$('#dr').classList.add('on')}
  if(t.dataset.q!==undefined){const i=C[t.dataset.q];i.q+=+t.dataset.d;if(i.q<1)C.splice(t.dataset.q,1);save()}
  if(t.dataset.open!==undefined)$('#dr').classList.add('on');
  if(t.dataset.close!==undefined)$('#dr').classList.remove('on');
});
document.addEventListener('keydown',e=>e.key=='Escape'&&$('#dr').classList.remove('on'));
const T=Date.parse(R.drop);
function tick(){let d=Math.max(0,T-Date.now());const v=[864e5,36e5,6e4,1e3].map(u=>{const x=Math.floor(d/u);d-=x*u;return String(x).padStart(2,'0')});
  $$('[data-count]').forEach(e=>e.innerHTML=['DÍAS','HORAS','MIN','SEG'].map((l,i)=>`<span><b>${v[i]}</b>${l}</span>`).join(''))}
tick();setInterval(tick,1000);draw();
