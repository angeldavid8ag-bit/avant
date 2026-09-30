/* Página pages/productos.html: conecta el formulario de filtros con la lista.
   Los filtros se guardan en la dirección (?categoria=cloro&orden=asc) para que
   al recargar o compartir el enlace se conserven. */

whenStoreReady(() => {
  const DEFAULTS = { search: "", category: "todas", sort: "default", availability: "todos", presentation: "todas" };
  const PARAMS = { search: "q", category: "categoria", sort: "orden", availability: "disponibilidad", presentation: "presentacion" };
  const filters = { ...DEFAULTS };

  const BASE_TITLE = document.title;
  const BASE_DESCRIPTION = document.querySelector('meta[name="description"]').content;

  const el = {
    form: document.getElementById("filters"),
    search: document.getElementById("f-search"),
    category: document.getElementById("f-category"),
    sort: document.getElementById("f-sort"),
    availability: document.getElementById("f-availability"),
    presentation: document.getElementById("f-presentation"),
    clear: document.getElementById("f-clear"),
    count: document.getElementById("result-count"),
    grid: document.getElementById("product-grid"),
    empty: document.getElementById("empty-message")
  };

  const option = (value, label) => `<option value="${value}">${label}</option>`;

  function fillSelects() {
    el.category.innerHTML = option("todas", "Todas") + categories.map((c) => option(c.id, c.name)).join("");
    const presentations = [...new Set(products.map((p) => p.presentation))];
    el.presentation.innerHTML = option("todas", "Todas") + presentations.map((p) => option(p, p)).join("");
  }

  /* Lee la dirección y acepta solo valores válidos. */
  function readUrl() {
    const params = new URLSearchParams(location.search);
    const get = (key) => params.get(PARAMS[key]);
    if (get("search")) filters.search = get("search");
    if (getCategory(get("category"))) filters.category = get("category");
    if (["asc", "desc"].includes(get("sort"))) filters.sort = get("sort");
    if (["disponible", "agotado"].includes(get("availability"))) filters.availability = get("availability");
    if (products.some((p) => p.presentation === get("presentation"))) filters.presentation = get("presentation");
  }

  /* Escribe en la dirección solo los filtros que no estén en su valor normal. */
  function updateUrlAndTitle() {
    const params = new URLSearchParams();
    for (const key in PARAMS) {
      const value = key === "search" ? filters.search.trim() : filters[key];
      if (value !== DEFAULTS[key]) params.set(PARAMS[key], value);
    }
    const query = params.toString();
    try { history.replaceState(null, "", location.pathname + (query ? "?" + query : "")); } catch { /* algunos entornos no lo permiten */ }

    const category = getCategory(filters.category);
    setPageMeta({
      title: category ? `${category.name} | Catálogo ${businessInfo.name}` : BASE_TITLE,
      description: category ? `${category.description} Consulta precios y disponibilidad.` : BASE_DESCRIPTION
    });
  }

  function syncControls() {
    el.search.value = filters.search;
    el.category.value = filters.category;
    el.sort.value = filters.sort;
    el.availability.value = filters.availability;
    el.presentation.value = filters.presentation;
  }

  function render() {
    const list = filterProducts(products, filters);
    el.grid.innerHTML = list.map(productCard).join("");
    el.empty.hidden = list.length > 0;
    el.count.textContent = `${list.length} ${list.length === 1 ? "producto" : "productos"}`;
    updateUrlAndTitle();
  }

  el.form.addEventListener("input", () => {
    filters.search = el.search.value;
    filters.category = el.category.value;
    filters.sort = el.sort.value;
    filters.availability = el.availability.value;
    filters.presentation = el.presentation.value;
    render();
  });
  el.form.addEventListener("submit", (e) => e.preventDefault());
  el.clear.addEventListener("click", () => {
    Object.assign(filters, DEFAULTS);
    syncControls();
    render();
  });

  fillSelects();
  readUrl();
  syncControls();
  render();
});
