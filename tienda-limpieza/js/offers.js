/* OFERTAS Y PAQUETES  (por ahora vacío: AVANT no ha definido ofertas ni paquetes)

   1) Productos en oferta: escribe "id del producto: precio de oferta".
      Se les agrega onSale y discountPrice automáticamente.
      (También puedes poner onSale: true y discountPrice: 39 directamente
       dentro de un producto en products.js; funciona igual.)
   2) Paquetes: lista de productos (por id) y un precio fijo del paquete. */

const saleOverrides = {};   // ejemplo: { 1: 18 } pone el producto 1 en oferta a $18

// En modo API (API_BASE_URL con dirección) las ofertas vienen del servidor, no de aquí.
if (!API_BASE_URL) {
  products.forEach((p) => {
    if (saleOverrides[p.id] != null) { p.onSale = true; p.discountPrice = saleOverrides[p.id]; }
  });
}

const isOnSale = (p) => p.onSale === true && typeof p.discountPrice === "number" && p.discountPrice < p.price;
const effectivePrice = (p) => (isOnSale(p) ? p.discountPrice : p.price);

/* Ejemplo de paquete (bórralo o cópialo):
   { id: "basico", name: "Paquete básico", icon: "📦", price: 99, description: "Lo esencial.",
     items: [{ id: 1, qty: 1 }, { id: 3, qty: 1 }] }
   Después cambia SHOW_PROMOTIONS a true en js/config.js. */
const packages = [];

/* Productos que componen un paquete (ignora ids que no existan). */
const packageItems = (pkg) =>
  pkg.items.map((i) => ({ product: products.find((p) => p.id === i.id), qty: i.qty })).filter((i) => i.product);

/* Precio si compraras cada producto por separado. */
const packageNormalPrice = (pkg) => packageItems(pkg).reduce((s, i) => s + effectivePrice(i.product) * i.qty, 0);

/* Cuántos paquetes se pueden armar con el stock actual (0 = no disponible). */
function packageMaxQty(pkg) {
  const list = packageItems(pkg);
  if (!list.length || list.length !== pkg.items.length) return 0;
  return Math.min(...list.map((i) => Math.floor(i.product.stock / i.qty)));
}
