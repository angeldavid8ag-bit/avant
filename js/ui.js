/* Piezas compartidas por todas las páginas: formato de precio, tarjetas,
   header, footer, menú móvil, botón flotante de WhatsApp, avisos y contador.
   BASE hace que los enlaces funcionen desde index.html ("") y desde
   pages/ ("../"). Se define en <body data-base="..."> */

const CURRENCY = "$";
const BASE = document.body.dataset.base || "";

const formatPrice = (value) => `${CURRENCY}${value.toFixed(2)}`;
const getCategory = (id) => categories.find((c) => c.id === id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Actualiza título y descripción de la página (también los de Open Graph). */
function setPageMeta({ title, description }) {
  document.title = title;
  const set = (selector, value) => document.querySelector(selector)?.setAttribute("content", value);
  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
}

const oldPrice = (value, label) => `<span class="price-old"><span class="sr-only">${label} </span>${formatPrice(value)}</span> `;

function productImage(product, size = "") {
  if (product.image) {
    return `<img src="${BASE}${product.image}" alt="${product.name} ${product.presentation}" loading="lazy" decoding="async" width="320" height="240">`;
  }
  const icon = getCategory(product.category)?.icon ?? "🧴";
  return `<span class="placeholder ${size}" role="img" aria-label="${product.name} (imagen pendiente)">${icon}</span>`;
}

function productCard(product) {
  const available = product.stock > 0;
  const sale = isOnSale(product);
  return `
    <li>
      <article class="product-card">
        <div class="product-media">${sale ? '<span class="badge-sale">OFERTA</span>' : ""}${productImage(product)}</div>
        <div class="product-body">
          <p class="product-category">${getCategory(product.category)?.name ?? ""}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <p class="product-meta">
            <span class="product-presentation">${product.presentation}</span>
            <span class="stock ${available ? "in" : "out"}">${available ? "Disponible" : "Agotado"}</span>
          </p>
          <p class="product-price">${sale ? oldPrice(product.price, "Precio anterior") : ""}${formatPrice(effectivePrice(product))}</p>
          <div class="product-actions">
            <button class="btn btn-primary" type="button" data-add="${product.id}" ${available ? "" : "disabled"}>Agregar al carrito<span class="sr-only">: ${product.name} ${product.presentation}</span></button>
            <a class="btn btn-ghost" href="${BASE}pages/producto.html?id=${product.id}">Ver detalles<span class="sr-only">: ${product.name} ${product.presentation}</span></a>
          </div>
        </div>
      </article>
    </li>`;
}

function packageCard(pkg) {
  const available = packageMaxQty(pkg) > 0;
  const normal = packageNormalPrice(pkg);
  const saving = normal - pkg.price;
  const items = packageItems(pkg)
    .map((i) => `<li>${i.qty > 1 ? i.qty + "x " : ""}${i.product.name} <span class="muted">${i.product.presentation}</span></li>`)
    .join("");
  return `
    <li>
      <article class="package-card">
        <p class="package-icon" aria-hidden="true">${pkg.icon}</p>
        <h3>${pkg.name}</h3>
        <p class="product-desc">${pkg.description}</p>
        <ul class="package-items">${items}</ul>
        <p class="product-price">${saving > 0 ? oldPrice(normal, "Precio por separado") : ""}${formatPrice(pkg.price)}</p>
        ${saving > 0 ? `<p class="saving">Ahorras ${formatPrice(saving)}</p>` : ""}
        <button class="btn btn-primary" type="button" data-add-package="${pkg.id}" ${available ? "" : "disabled"}>${available ? "Agregar paquete" : "No disponible"}<span class="sr-only">: ${pkg.name}</span></button>
      </article>
    </li>`;
}

/* Marca con aria-current la página donde estás. */
const currentPage = location.pathname.split("/").pop() || "index.html";
const navLink = (href, label, ...pages) =>
  `<li><a href="${BASE}${href}"${pages.includes(currentPage) ? ' aria-current="page"' : ""}>${label}</a></li>`;

function headerHTML() {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="${BASE}index.html"><img class="logo-img" src="${BASE}${brand.logo}" alt="${esc(businessInfo.name)}" width="80" height="55"></a>
      <nav id="main-nav" class="main-nav" aria-label="Principal">
        <ul>
          ${navLink("index.html", "Inicio", "index.html")}
          ${navLink("pages/productos.html", "Productos", "productos.html", "producto.html")}
          <li><a href="${BASE}index.html#categorias">Categorías</a></li>
          ${SHOW_PROMOTIONS ? navLink("pages/ofertas.html", "Ofertas", "ofertas.html") : ""}
          ${navLink("pages/nosotros.html", "Nosotros", "nosotros.html")}
          ${navLink("pages/contacto.html", "Contacto", "contacto.html")}
        </ul>
      </nav>
      <div class="header-actions">
        <a class="cart-link" href="${BASE}pages/carrito.html" aria-label="Carrito, 0 productos">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20.5 8H6"/></svg>
          <span id="cart-count" class="cart-count">0</span>
        </a>
        <button id="menu-toggle" class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footerHTML() {
  const val = (v) => (v ? esc(v) : "Por definir");
  return `
  <footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <p class="footer-title">${esc(businessInfo.name)}</p>
        <p>${esc(businessInfo.tagline)}</p>
      </div>
      <nav aria-label="Pie de página">
        <ul>
          <li><a href="${BASE}index.html">Inicio</a></li>
          <li><a href="${BASE}pages/productos.html">Productos</a></li>
          ${SHOW_PROMOTIONS ? `<li><a href="${BASE}pages/ofertas.html">Ofertas y paquetes</a></li>` : ""}
          <li><a href="${BASE}pages/nosotros.html">Nosotros</a></li>
          <li><a href="${BASE}pages/contacto.html">Contacto</a></li>
        </ul>
      </nav>
      <ul class="footer-contact">
        <li>Teléfono: ${val(businessInfo.phone)}</li>
        <li>Correo: ${val(businessInfo.email)}</li>
        <li>Horario: ${val(businessInfo.schedule)}</li>
        <li>Ubicación: ${val(businessInfo.address)}</li>
      </ul>
    </div>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} ${esc(businessInfo.name)}. Todos los derechos reservados.</p>
  </footer>`;
}

function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

document.getElementById("site-header").innerHTML = headerHTML();
document.getElementById("site-footer").innerHTML = footerHTML();
setupMenu();

/* ---------- Avisos (toast) ---------- */
document.body.insertAdjacentHTML("beforeend", '<div id="toast" class="toast" role="status" aria-live="polite"></div>');
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ---------- WhatsApp: enlaces y botón flotante ---------- */
function wireWhatsAppLink(el, message) {
  el.href = whatsappUrl(message);
  el.target = "_blank";
  el.rel = "noopener";
  el.addEventListener("click", (e) => {
    if (!isWhatsAppConfigured()) { e.preventDefault(); showToast(WA_SETUP_HINT); }
  });
}

document.body.insertAdjacentHTML("beforeend", `
  <aside aria-label="Contacto rápido"><a id="wa-float" class="wa-float" href="#" aria-label="Escribir por WhatsApp">
    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4z"/><circle cx="8.3" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="15.7" cy="12" r="1.2"/></svg>
  </a></aside>`);
wireWhatsAppLink(document.getElementById("wa-float"), WA_DEFAULT_MESSAGE);

/* ---------- Carrito: contador y botones "Agregar" ---------- */
function updateCartCount() {
  const n = cartCount();
  document.getElementById("cart-count").textContent = n;
  document.querySelector(".cart-link").setAttribute("aria-label", `Carrito, ${n} ${n === 1 ? "producto" : "productos"}`);
}

function addToCartWithFeedback(id, qty = 1) {
  const item = typeof id === "number" ? findProduct(id) : findPackage(id);
  if (!item) return;
  const name = typeof id === "number" ? `${item.name} ${item.presentation}` : item.name;
  const max = maxQtyFor(id);
  const result = cartAdd(id, qty);
  if (!result.ok) showToast(`Ya tienes en el carrito todas las piezas disponibles de ${name}.`);
  else if (result.capped) showToast(`Solo hay ${max} disponibles de ${name}; quedaron en tu carrito.`);
  else showToast(`${name} agregado al carrito.`);
}

document.addEventListener("click", (e) => {
  const prod = e.target.closest("[data-add]");
  if (prod) addToCartWithFeedback(Number(prod.dataset.add));
  const pack = e.target.closest("[data-add-package]");
  if (pack) addToCartWithFeedback(pack.dataset.addPackage);
});
document.addEventListener("cart:change", updateCartCount);
updateCartCount();

/* ---------- Avisos de precios (PRICE_NOTE en js/config.js) ---------- */
document.querySelectorAll("[data-price-note]").forEach((el) => { el.textContent = PRICE_NOTE; });

whenStoreReady(updateCartCount);
