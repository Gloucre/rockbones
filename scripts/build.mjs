// Generador estático: data/*.json + plantillas -> dist/ (páginas HTML sin dependencias de runtime)
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'fs'; rmSync('dist', { recursive: true, force: true });
const B = process.env.BASE || '';
const S = JSON.parse(readFileSync('data/site.json','utf8'));
const P = JSON.parse(readFileSync('data/products.json','utf8'));
const eur = n => '€' + String(n).replace('.', ',');
const img = (n, alt = '') => `<img src="${B}/img/${n}.jpg" alt="${alt}" loading="lazy">`;
const write = (p, h) => { mkdirSync('dist/' + p, { recursive: true }); writeFileSync(`dist/${p}/index.html`, h); };
const card = p => `<a class="card" href="${B}/producto/${p.slug}/"><div class="im">${img(p.img, p.name)}</div><div class="in"><div><span class="tag">${p.col.toUpperCase()}</span><br><b>${p.name}</b><div>${eur(p.price)}</div></div><button class="add" data-add="${p.slug}" aria-label="Añadir ${p.name}">+</button></div></a>`;
const count = `<div class="cd" data-count aria-label="Cuenta atrás para ${S.dropName}"></div>`;
const mq = `<div class="mq" aria-hidden="true"><div>${'SKATE / ROCK / STREET CULTURE / SIN PERMISO / '.repeat(8)}</div></div>`;
const layout = (title, body, on = '', desc = S.claim) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title} · ROCKBONES</title><meta name="description" content="${desc}"><meta property="og:image" content="${B}/img/hero.jpg"><meta name="theme-color" content="#050505">
<link rel="icon" href="${B}/img/mark.jpg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;700&family=Inter:wght@400;500&family=Permanent+Marker&display=swap" rel="stylesheet"><link rel="stylesheet" href="${B}/style.css"></head><body>
<header><div class="w hd"><a class="lg" href="${B}/" aria-label="Rockbones, inicio"><img src="${B}/img/logo.jpg" alt="Rockbones"></a>
<nav>${[['tienda', 'TIENDA'], ['raw', 'RAW'], ['culture', 'CULTURE']].map(([h, n]) => `<a href="${B}/${h}/" class="${on == h ? 'on' : ''}">${n}</a>`).join('')}</nav><button class="cb" data-open>CESTA <span id="cn">0</span></button></div></header>
<main>${body}</main>
<footer><div class="w"><span>© 2026 ROCKBONES. ${S.claim.toUpperCase()}</span><span>${S.claim2.toUpperCase()}</span><a href="mailto:${S.email}">${S.email}</a></div></footer>
<aside class="dr" id="dr" aria-label="Cesta"><div class="sh"><h2 style="font-size:28px">Cesta</h2><button class="cb" data-close>CERRAR</button></div><span id="fr" class="g"></span><div class="bar"><i id="bar"></i></div><div id="lines" style="flex:1;overflow:auto"></div>
<div class="sh" style="margin:12px 0"><b>Total</b><b id="tot"></b></div><a class="btn" id="co" href="#">TRAMITAR PEDIDO</a></aside>
<script>window.RB=${JSON.stringify({ base: B, email: S.email, free: S.free, ship: S.ship, drop: S.dropDate, products: P.map(({ slug, name, price, img, sizes }) => ({ slug, name, price, img, sizes })) })}</script><script src="${B}/app.js"></script></body></html>`;

const core = P.filter(p => p.col == 'core'), raw = P.filter(p => p.col == 'raw');
// HOME
write('', layout(S.name, `
<section class="hero" style="padding:0"><img src="${B}/img/hero.jpg" alt="Skater saltando, Rockbones RAW"><div class="w"><span class="tag y">${S.dropName.toUpperCase()}</span><h1>ROCKBONES</h1><p class="cl">${S.claim}</p>${count}<div><a class="btn" href="${B}/raw/">VER EL DROP</a> <a class="btn o" href="${B}/tienda/">TIENDA</a></div></div></section>${mq}
<section><div class="w"><div class="sh"><h2>Core collection</h2><a href="${B}/tienda/" class="g">Ver todo</a></div><div class="grid">${core.map(card).join('')}</div></div></section>
<section class="raw"><div class="w two"><div><p class="ln1">Sin filtros.<br>Sin permiso.<br>Sin pulir.<br>Sin copiar.<br>Sin miedo.</p><br><a class="btn" href="${B}/raw/">ENTRAR EN RAW</a></div>${img('raw-wall', 'Pared con carteles RAW')}</div></section>
<section><div class="w two">${img('sunset', 'Hoodie Rockbones al atardecer')}<div><h2 class="big">No es solo lo que vistes.</h2><p class="g">Es lo que te mueve. La calle, la música, el arte, el skate, la gente, el ruido.</p><p class="mk y" style="font-size:32px">Se lleva dentro.</p><a class="btn o" href="${B}/culture/">MANIFIESTO</a></div></div></section>`));
// TIENDA
write('tienda', layout('Tienda', `<section><div class="w"><div class="sh"><h2>Tienda</h2><span class="g">Envío gratis desde ${eur(S.free)}</span></div><div class="grid">${P.map(card).join('')}</div></div></section>`, 'tienda'));
// RAW
write('raw', layout('RAW', `<section class="raw" style="padding:0"><div class="w two" style="padding-top:56px;padding-bottom:56px"><div><span class="tag">${S.dropName.toUpperCase()}</span><h1 class="big" style="margin:12px 0">Rockbones <span class="mk y">RAW</span></h1><p>La parte más salvaje de Rockbones. Skate, rock, arte y calle en su forma más cruda. No sigue reglas, no se adapta, no copia.</p>${count}</div>${img('hero', 'Rockbones RAW')}</div></section>
<section><div class="w"><div class="sh"><h2>Colección RAW</h2></div><div class="grid">${raw.map(card).join('')}</div></div></section>
<section style="padding-top:0"><div class="w grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${['raw-pack', 'raw-stickers', 'raw-gig', 'raw-label'].map(i => img(i)).join('')}</div></section>`, 'raw'));
// CULTURE
write('culture', layout('Culture', `<section><div class="w two"><div><h1 class="big">Lo llevas<br>dentro.</h1><p class="mk y" style="font-size:30px">${S.claim2}</p><p class="g">Rockbones no es una marca. Es una forma de vida: el skate, el rock, la calle, el arte, el ruido. Es lo que nos mueve.</p></div>${img('long-low', 'Longboard Rockbones')}</div></section>
<section style="padding-top:0"><div class="w"><div class="sh"><h2>Qué publicamos</h2></div><div class="pil">${[['30%', 'Producto'], ['30%', 'Skate'], ['20%', 'Cultura'], ['10%', 'Gente'], ['10%', 'Arte']].map(([n, l]) => `<div><b>${n}</b>${l}</div>`).join('')}</div></div></section>
<section style="padding-top:0"><div class="w two"><div><h2 class="big">Paleta</h2><div class="sw"><i style="background:#000"></i><i style="background:#ebe5dd"></i><i style="background:#8b8b8b"></i><i style="background:#d7ff00"></i><i style="background:#c9986a"></i></div><p class="g">Black, Bone, Concrete Grey, Acid Yellow y Raw Wood.</p></div>${img('long-skullwood', 'Calavera sobre madera')}</div></section>
<section class="raw"><div class="w"><h2 class="big">Únete a la crew</h2><p class="g">Drops, sessions y contenido antes que nadie.</p><form class="fm" action="mailto:${S.email}" method="post" enctype="text/plain"><input type="email" name="correo" placeholder="Tu correo" required aria-label="Correo"><button class="btn">APUNTARME</button></form></div></section>`, 'culture'));
// PRODUCTOS
for (const p of P) write('producto/' + p.slug, layout(p.name, `<section><div class="w two"><div class="card"><div class="im" style="aspect-ratio:1/1.1">${img(p.img, p.name)}</div></div><div><span class="tag">${p.col.toUpperCase()}</span><h1 class="big" style="margin:10px 0">${p.name}</h1><b style="font:700 28px var(--hd)">${eur(p.price)}</b><p class="g">${p.desc}</p>
${p.sizes.length ? `<div>${p.sizes.map((s, i) => `<button class="sz ${i == 1 || p.sizes.length == 1 ? 'on' : ''}" data-z="${s}">${s}</button>`).join(' ')}</div>` : ''}<ul class="pp">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul><button class="btn" data-add="${p.slug}">AÑADIR A LA CESTA</button></div></div></section>`, 'tienda', p.desc));

writeFileSync('dist/404.html', layout('404', `<section><div class="w"><h1 class="big">Te caíste.</h1><p class="mk y" style="font-size:30px">Levántate y sigue.</p><a class="btn" href="${B}/">VOLVER</a></div></section>`));
cpSync('src/public', 'dist', { recursive: true });
console.log('Sitio generado en dist/ con base "' + B + '"');
