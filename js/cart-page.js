/* Página pages/carrito.html: muestra el carrito, permite editarlo y
   generar el pedido por WhatsApp. */

whenStoreReady(() => {
  const root = document.getElementById("cart-root");
  let refocus = null; // para no perder el foco del teclado al redibujar

  const parseRef = (s) => (/^\d+$/.test(s) ? Number(s) : s); // "3" -> producto 3, "basico" -> paquete

  function lineHTML(line) {
    const label = line.kind === "product" ? `${line.name} ${line.detail}` : line.name;
    const thumb = line.kind === "product"
      ? productImage(line.product)
      : `<span class="placeholder" role="img" aria-label="${line.name}">${line.pkg.icon}</span>`;
    const title = line.kind === "product" ? `<a href="producto.html?id=${line.id}">${line.name}</a>` : line.name;
    const sale = line.regularPrice > line.unitPrice ? oldPrice(line.regularPrice, "Precio anterior") : "";
    const includes = line.includes ? `<p class="cart-includes">Incluye: ${esc(line.includes.join(", "))}</p>` : "";
    const max = Math.max(line.max, 1);
    return `
      <li class="cart-item">
        <div class="cart-thumb">${thumb}</div>
        <div class="cart-info">
          <h2>${title}</h2>
          <p>${line.detail} &middot; ${sale}${formatPrice(line.unitPrice)} c/u</p>
          ${includes}
        </div>
        <div class="cart-controls">
          <div class="qty-stepper">
            <button type="button" data-action="dec" data-id="${line.id}" aria-label="Quitar una pieza de ${label}" ${line.qty <= 1 ? "disabled" : ""}>&minus;</button>
            <input type="number" min="1" max="${max}" value="${line.qty}" data-qty="${line.id}" aria-label="Cantidad de ${label}">
            <button type="button" data-action="inc" data-id="${line.id}" aria-label="Agregar una pieza de ${label}" ${line.qty >= max ? "disabled" : ""}>+</button>
          </div>
          <span class="cart-subtotal">${formatPrice(line.subtotal)}</span>
          <button type="button" class="link-btn" data-action="remove" data-id="${line.id}" aria-label="Eliminar ${label} del carrito">Eliminar</button>
        </div>
      </li>`;
  }

  function render() {
    const lines = cartLines();
    if (!lines.length) {
      root.innerHTML = `
        <p class="empty">Tu carrito está vacío.</p>
        <p class="more"><a class="btn btn-primary" href="productos.html">Ver productos</a></p>`;
      return;
    }
    const count = cartCount();
    const orderUrl = whatsappUrl(buildOrderMessage(lines, cartTotal()));
    root.innerHTML = `
      <div class="cart-layout">
        <ul class="cart-list">${lines.map(lineHTML).join("")}</ul>
        <aside class="cart-summary" aria-label="Resumen del pedido">
          <p class="cart-total"><span>Total</span><span>${formatPrice(cartTotal())}</span></p>
          <p class="note">${count} ${count === 1 ? "artículo" : "artículos"}. ${PRICE_NOTE} No se cobra nada en línea: el pedido se confirma por WhatsApp.</p>
          <a class="btn btn-primary" data-action="order" href="${orderUrl}" target="_blank" rel="noopener">Realizar pedido por WhatsApp</a>
          <a class="btn btn-ghost" href="productos.html">Seguir comprando</a>
          <button type="button" class="link-btn" data-action="clear">Vaciar carrito</button>
        </aside>
      </div>`;
    if (refocus) { root.querySelector(refocus)?.focus(); refocus = null; }
  }

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "order") {
      if (!isWhatsAppConfigured()) { e.preventDefault(); showToast(WA_SETUP_HINT); }
      return;
    }
    if (action === "clear") { if (confirm("¿Vaciar todo el carrito?")) cartClear(); return; }

    const id = parseRef(btn.dataset.id);
    const line = cartLines().find((l) => l.id === id);
    if (action === "remove") { cartRemove(id); return; }
    if (!line) return;
    refocus = `[data-action="${action}"][data-id="${btn.dataset.id}"]`;
    cartSetQty(id, action === "inc" ? line.qty + 1 : line.qty - 1);
  });

  root.addEventListener("change", (e) => {
    const input = e.target.closest("[data-qty]");
    if (input) cartSetQty(parseRef(input.dataset.qty), parseInt(input.value, 10) || 1);
  });

  document.addEventListener("cart:change", render);
  render();
});
