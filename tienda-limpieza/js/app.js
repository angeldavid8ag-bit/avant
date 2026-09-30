/* Página de inicio: dibuja categorías y una muestra del catálogo. */

whenStoreReady(() => {
  const FEATURED_COUNT = 8;

  function renderCategories() {
    document.getElementById("category-grid").innerHTML = categories
      .map(
        (c) => `
        <li>
          <a class="category-card" href="${BASE}pages/productos.html?categoria=${c.id}">
            <span class="category-icon" aria-hidden="true">${c.icon}</span>
            <span class="category-name">${c.name}</span>
            <span class="category-desc">${c.description}</span>
            <span class="category-link">Ver productos</span>
          </a>
        </li>`
      )
      .join("");
  }

  function renderProducts() {
    document.getElementById("product-grid").innerHTML = products.slice(0, FEATURED_COUNT).map(productCard).join("");
  }

  renderCategories();
  renderProducts();

  function renderPackages() {
    document.getElementById("package-grid").innerHTML = packages.map(packageCard).join("");
  }
  if (SHOW_PROMOTIONS && packages.length) renderPackages();
  else document.getElementById("ofertas")?.remove();

  wireWhatsAppLink(document.getElementById("hero-wa"), WA_DEFAULT_MESSAGE);
});
