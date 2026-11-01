# ROCKBONES — web

Sitio estático multipágina (Node) para Rockbones: home con cuenta atrás del drop, tienda con cesta, Drop 001 RAW, culture y ficha por producto.

## Uso
```bash
npm install
npm run assets   # recorta las maquetas de /reference a src/public/img (opcional, ya incluidas)
npm run build    # genera dist/
npm start        # build + servidor local
```

## Dónde se edita
- `data/site.json`: claim, email de pedidos, fecha del drop (`dropDate`), envío gratis y coste de envío.
- `data/products.json`: catálogo. Los precios de RAW, Longboard y Stickers son de ejemplo.
- `src/public/style.css` y `src/public/app.js`: estilo y cesta.
- `scripts/build.mjs`: plantillas de cada página.

## Publicar en GitHub Pages
1. Sube el repo a GitHub (rama `main`).
2. En Settings > Pages, elige **GitHub Actions** como fuente.
3. Cada push despliega con `.github/workflows/pages.yml` en `https://USUARIO.github.io/REPO/`.
4. Con dominio propio (rockbones.es): añade `src/public/CNAME` con el dominio y cambia `BASE` a vacío en el workflow.

## Pedidos
La cesta se guarda en el navegador y "Tramitar pedido" abre un correo con el resumen. Para cobrar online, el siguiente paso natural es enlazar Stripe Payment Links o migrar la tienda a Shopify.
