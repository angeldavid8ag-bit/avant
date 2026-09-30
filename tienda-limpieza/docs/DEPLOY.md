# Cómo publicar el sitio gratis con GitHub Pages

Guía paso a paso, pensada para hacerlo por primera vez. Al terminar tendrás una dirección como
`https://TU-USUARIO.github.io/tienda-avant/` que cualquiera puede abrir.

Documentación oficial de referencia: https://docs.github.com/en/pages/quickstart

---

## 0. Antes de publicar: lista de revisión

- [ ] **Confirma que el número de `WHATSAPP_NUMBER` (en `js/config.js`) tiene WhatsApp.** Si no, los pedidos no le llegarán a nadie.
- [ ] Llena en `js/config.js` lo que falte: correo, horario, ubicación y redes (o déjalo vacío para que diga "Por definir").
- [ ] Revisa que **cada precio** de `js/products.js` coincida con la lista de precios actual.
- [ ] Revisa las existencias: `stock: 99` significa "disponible"; usa `stock: 0` para marcar "Agotado".
- [ ] Cambia `images/logo-avant.png` por el archivo original del logo si lo tienes (mejor calidad).
- [ ] Si vas a mostrar ofertas o paquetes: agrégalos en `js/offers.js` y pon `SHOW_PROMOTIONS = true`.
- [ ] Ábrelo en tu celular y en la computadora, prueba agregar productos y pedir por WhatsApp.

> **Recuerda:** en el plan gratuito el repositorio será **público**, o sea que todo el código es visible.
> Nunca subas contraseñas, claves ni datos privados. El teléfono y el WhatsApp ya son visibles en la página.

## 1. Crea tu cuenta y tu repositorio

1. Crea una cuenta en https://github.com (si no tienes una).
2. Arriba a la derecha pulsa **+** → **New repository**.
3. **Repository name:** escribe `tienda-avant` (todo en minúsculas, sin espacios ni acentos: GitHub distingue mayúsculas).
4. Elige **Public**.
5. No marques "Add a README" (ya tenemos uno). Pulsa **Create repository**.

## 2. Sube los archivos (elige UNA opción)

El proyecto tiene **45 archivos**.

### Opción A: desde el navegador (sin instalar nada)

1. En tu repositorio nuevo pulsa **uploading an existing file** (o **Add file → Upload files**).
2. Abre la carpeta del proyecto en tu computadora y **selecciona TODO su contenido** (no la carpeta en sí) y arrástralo a la página.
   Debe quedar `index.html` **en la raíz** del repositorio, no dentro de otra carpeta.
3. Espera a que termine de cargar y pulsa **Commit changes**.

Si el navegador no deja subir todo de una vez (GitHub limita cuántos archivos se suben por carga desde la web),
sube por partes: primero `index.html`, `404.html` y las carpetas `css`, `js`, `pages`, `images`, y luego `docs` y `admin`.

### Opción B: con Git (recomendada si vas a hacer cambios seguido)

1. Instala Git: https://git-scm.com/downloads
2. Abre una terminal **dentro de la carpeta del proyecto** y ejecuta (cambia `TU-USUARIO`):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"

git init
git add .
git commit -m "Primera versión de la tienda AVANT"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/tienda-avant.git
git push -u origin main
```

Git te pedirá iniciar sesión en GitHub (se abre una ventana del navegador).

## 3. Activa GitHub Pages

1. En tu repositorio: **Settings** (Configuración).
2. En la barra lateral, sección "Code and automation", pulsa **Pages**.
3. En **Build and deployment → Source** elige **Deploy from a branch**.
4. En **Branch** elige **main** y la carpeta **/ (root)**. Pulsa **Save**.
5. Espera. GitHub indica que los cambios pueden tardar **hasta 10 minutos** en publicarse; al terminar aparece el botón **Visit site**.

Tu dirección será: `https://TU-USUARIO.github.io/tienda-avant/`

> Si la opción "Deploy from a branch" aparece desactivada, revisa que el repositorio sea **público**:
> en el plan gratuito la publicación desde una rama funciona solo con repositorios públicos.

## 4. Verifica que todo funciona

Abre tu dirección y revisa, en computadora **y en celular**:

- [ ] Se ve el logo y los estilos (colores, tarjetas).
- [ ] El menú lleva a Productos, Nosotros y Contacto sin errores.
- [ ] Puedes filtrar el catálogo y abrir el detalle de un producto.
- [ ] Agregas productos, abres el carrito y **"Realizar pedido por WhatsApp"** abre el chat con el mensaje armado.
      (Para probar, pon temporalmente **tu propio número** en `WHATSAPP_NUMBER` y no el del negocio.)
- [ ] El botón verde flotante de WhatsApp abre el chat.
- [ ] Una dirección que no existe (por ejemplo `.../hola`) muestra la página "Página no encontrada".

## 5. Cómo actualizar el sitio después

1. Edita el archivo (por ejemplo `js/products.js` para un precio):
   - **Desde GitHub:** abre el archivo → ícono del lápiz → cambia → **Commit changes**.
   - **Con Git:** edita, y luego `git add .`, `git commit -m "Actualizo precios"`, `git push`.
2. **Sube el número de versión** para que los visitantes no vean archivos viejos: en los HTML busca `?v=7` y
   cámbialo a `?v=8` (la siguiente vez, `?v=9`, y así). Se usa "buscar y reemplazar" en el editor.
3. Espera unos minutos y recarga con **Ctrl + F5**.

## 6. Dominio propio (opcional)

No es necesario: el sitio funciona con la dirección `github.io`, sin costo. Si quieres una dirección como
`www.avant.mx`, tendrás que comprar el dominio a un registrador (el precio anual varía; verifica el vigente)
y conectarlo desde **Settings → Pages → Custom domain**, siguiendo la guía oficial de GitHub sobre dominios
personalizados. Con dominio propio también puedes activar HTTPS desde esa misma pantalla.

## 7. Después de publicar: mejoras de posicionamiento (SEO)

Estas cosas necesitan conocer tu dirección final, por eso no están hechas todavía:

1. **Sitemap:** copia `docs/sitemap.plantilla.xml` a la carpeta principal como `sitemap.xml` y reemplaza la
   dirección de ejemplo por la tuya (instrucciones dentro del archivo).
2. **Google Search Console** (gratis): registra tu dirección y envía el sitemap.
3. **Imagen para compartir** (`og:image`): una imagen de 1200×630 px con tu logo; requiere la dirección completa.
4. Nota: `robots.txt` solo funciona cuando el sitio está en la raíz de un dominio (por ejemplo con dominio propio).
5. Los productos individuales no aparecen en buscadores hasta que existan páginas generadas por producto
   (ver `docs/ARQUITECTURA.md`, sección 9).

## 8. Problemas comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Página 404 de GitHub en tu dirección | `index.html` quedó dentro de una carpeta extra, o Pages no está activado | Debe estar en la raíz del repositorio; revisa el paso 3 |
| Se ve el texto sin colores ni logo | Subiste la carpeta dentro de otra carpeta, o el nombre de una carpeta cambió de mayúsculas | Las rutas deben ser exactamente `css/`, `js/`, `images/` en minúsculas |
| Cambié algo y no se ve | Caché del navegador o publicación en curso | Sube `?v=`, espera hasta 10 minutos y recarga con Ctrl + F5 |
| El botón de WhatsApp dice que falta el número | `WHATSAPP_NUMBER` sin configurar o con formato incorrecto | Solo dígitos con código de país, sin `+`, espacios ni guiones |
| No aparece "Deploy from a branch" | Repositorio privado en plan gratuito | Hazlo público (Settings → General → cambiar visibilidad) |
| El carrito muestra productos raros | Carrito guardado de una versión anterior | Vacía el carrito o borra los datos del sitio en tu navegador |

> **Mayúsculas y minúsculas:** GitHub Pages distingue `Logo.png` de `logo.png` (tu computadora con Windows,
> no). Si un archivo funciona en tu computadora pero no publicado, revisa que el nombre coincida exactamente.
