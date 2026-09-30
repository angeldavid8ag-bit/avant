/* CAPA DE ACCESO A DATOS
   Es el único lugar que sabe de dónde vienen categorías, productos y paquetes.

   - Modo local (API_BASE_URL vacío): usa los datos de products.js y offers.js.
   - Modo API (API_BASE_URL con dirección): los pide al servidor y reemplaza el
     contenido de esos arreglos, así el resto del sitio no necesita cambios.

   Las páginas que usan productos ejecutan su código dentro de whenStoreReady(),
   que espera a que los datos estén listos. El contrato de datos que debe
   devolver la API está en docs/ARQUITECTURA.md. */

const REQUEST_TIMEOUT_MS = 10000;

async function apiGet(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(API_BASE_URL + path, { headers: { Accept: "application/json" }, signal: controller.signal });
    if (!response.ok) throw new Error(`La API respondió ${response.status} en ${path}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/* Se resuelve en true cuando hay datos y en false si la carga falló (nunca lanza error). */
const storeReady = (async () => {
  if (!API_BASE_URL) return true;

  const status = document.createElement("p");
  status.className = "store-status";
  status.setAttribute("role", "status");
  status.textContent = "Cargando productos…";
  document.querySelector("main")?.prepend(status);

  try {
    const [cats, prods, pkgs] = await Promise.all([apiGet("/categories"), apiGet("/products"), apiGet("/packages")]);
    categories.splice(0, categories.length, ...cats);
    products.splice(0, products.length, ...prods);
    packages.splice(0, packages.length, ...pkgs);
    status.remove();
    return true;
  } catch (error) {
    console.error("No se pudo cargar el catálogo:", error);
    status.setAttribute("role", "alert");
    status.textContent = "No pudimos cargar los productos en este momento. Intenta de nuevo en unos minutos.";
    return false;
  }
})();

function whenStoreReady(callback) {
  storeReady.then((ok) => { if (ok) callback(); });
}
