/* Lógica del carrito. No toca el HTML: guarda datos y avisa con el evento
   "cart:change". El contador y la página del carrito escuchan ese evento.

   En localStorage solo guardamos { id, qty }:
     - id numérico  -> producto      (ej. { id: 3, qty: 2 })
     - id de texto  -> paquete       (ej. { id: "basico", qty: 1 })
   Los precios se buscan al mostrar, así nunca quedan precios viejos. */

const CART_KEY = "tienda_cart";

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(raw)) return [];
    return raw.filter((i) => i && (Number.isInteger(i.id) || typeof i.id === "string") && Number.isInteger(i.qty) && i.qty > 0);
  } catch {
    return [];
  }
}

let cartItems = readCart();

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch { /* sigue en memoria */ }
  document.dispatchEvent(new Event("cart:change"));
}

const findProduct = (id) => products.find((p) => p.id === id);
const findPackage = (id) => packages.find((p) => p.id === id);

/* Máximo de piezas que se pueden pedir de un producto o paquete. */
function maxQtyFor(id) {
  if (typeof id === "number") return findProduct(id)?.stock ?? 0;
  const pkg = findPackage(id);
  return pkg ? packageMaxQty(pkg) : 0;
}

/* Agrega piezas sin pasar del máximo. Devuelve { ok, capped }. */
function cartAdd(id, qty = 1) {
  const max = maxQtyFor(id);
  if (max <= 0) return { ok: false, capped: false };

  const item = cartItems.find((i) => i.id === id);
  const current = item ? item.qty : 0;
  if (current >= max) return { ok: false, capped: true };

  const wanted = current + Math.max(1, qty);
  const finalQty = Math.min(wanted, max);
  if (item) item.qty = finalQty; else cartItems.push({ id, qty: finalQty });
  saveCart();
  return { ok: true, capped: wanted > max };
}

/* Fija la cantidad (mínimo 1, máximo el disponible). Para quitar usa cartRemove. */
function cartSetQty(id, qty) {
  const item = cartItems.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.min(Math.max(1, qty), Math.max(maxQtyFor(id), 1));
  saveCart();
}

function cartRemove(id) {
  cartItems = cartItems.filter((i) => i.id !== id);
  saveCart();
}

function cartClear() {
  cartItems = [];
  saveCart();
}

/* Líneas listas para mostrar; ignora productos o paquetes que ya no existan. */
function cartLines() {
  return cartItems
    .map((i) => {
      if (typeof i.id === "number") {
        const p = findProduct(i.id);
        if (!p) return null;
        const unit = effectivePrice(p);
        return { id: p.id, kind: "product", product: p, name: p.name, detail: p.presentation,
                 unitPrice: unit, regularPrice: p.price, qty: i.qty, max: p.stock, subtotal: unit * i.qty, includes: null };
      }
      const pkg = findPackage(i.id);
      if (!pkg) return null;
      return { id: pkg.id, kind: "package", pkg, name: pkg.name, detail: "Paquete",
               unitPrice: pkg.price, qty: i.qty, max: packageMaxQty(pkg), subtotal: pkg.price * i.qty,
               includes: packageItems(pkg).map((x) => `${x.qty > 1 ? x.qty + "x " : ""}${x.product.name} ${x.product.presentation}`) };
    })
    .filter(Boolean);
}

const cartCount = () => cartLines().reduce((sum, l) => sum + l.qty, 0);
const cartTotal = () => cartLines().reduce((sum, l) => sum + l.subtotal, 0);

window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) {
    cartItems = readCart();
    document.dispatchEvent(new Event("cart:change"));
  }
});
