/* Página pages/producto.html?id=3: muestra un solo producto. */

whenStoreReady(() => {
  const box = document.getElementById("product-detail");
  const id = Number(new URLSearchParams(location.search).get("id"));
  const product = products.find((p) => p.id === id);

  if (!product) {
    setPageMeta({ title: `Producto no encontrado | ${businessInfo.name}`, description: "No encontramos el producto que buscas." });
    box.innerHTML = `
      <h1>Producto no encontrado</h1>
      <p class="empty">No encontramos este producto.</p>
      <a class="btn btn-primary" href="productos.html">Volver al catálogo</a>`;
  } else {
    const available = product.stock > 0;
    const sale = isOnSale(product);
    setPageMeta({
      title: `${product.name} ${product.presentation} | ${businessInfo.name}`,
      description: `${product.description} Presentación: ${product.presentation}.`
    });

    box.innerHTML = `
      <div class="detail-media">${sale ? '<span class="badge-sale">OFERTA</span>' : ""}${productImage(product, "big")}</div>
      <div class="detail-info">
        <h1>${product.name}</h1>
        <p class="detail-price">${sale ? oldPrice(product.price, "Precio anterior") : ""}${formatPrice(effectivePrice(product))}</p>
        <p>${product.description}</p>

        <h2 class="detail-sub">Características</h2>
        <dl class="detail-list">
          <dt>Categoría</dt><dd>${getCategory(product.category)?.name ?? ""}</dd>
          <dt>Presentación</dt><dd>${product.presentation}</dd>
          <dt>Disponibilidad</dt><dd><span class="stock ${available ? "in" : "out"}">${available ? "Disponible" : "Agotado"}</span></dd>
        </dl>

        <div class="qty-row">
          <label for="qty">Cantidad</label>
          <input id="qty" type="number" min="1" max="${Math.max(product.stock, 1)}" value="1" ${available ? "" : "disabled"}>
        </div>
        <button id="add-detail" class="btn btn-primary" type="button" ${available ? "" : "disabled"}>Agregar al carrito</button>
        <p><a href="productos.html">&larr; Volver al catálogo</a></p>
      </div>`;

    document.getElementById("add-detail")?.addEventListener("click", () => {
      const qty = parseInt(document.getElementById("qty").value, 10) || 1;
      addToCartWithFeedback(product.id, qty);
    });
  }
});
