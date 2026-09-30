/* Todo lo de WhatsApp: número, enlaces y mensaje del pedido.
   El número se configura en js/config.js (WHATSAPP_NUMBER). */

const WA_DEFAULT_MESSAGE = "Hola, quisiera información sobre sus productos de limpieza.";
const WA_SETUP_HINT = "El número de WhatsApp aún no está configurado (js/config.js).";

const whatsappDigits = () => String(WHATSAPP_NUMBER).replace(/[\s+()-]/g, "");
const isWhatsAppConfigured = () => /^\d{8,15}$/.test(whatsappDigits());

/* Devuelve el enlace de WhatsApp, o "#" si aún no hay número. */
function whatsappUrl(message) {
  if (!isWhatsAppConfigured()) return "#";
  return `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(message)}`;
}

/* Arma el mensaje del pedido a partir de las líneas del carrito. */
function buildOrderMessage(lines, total) {
  const rows = lines.map((l) => {
    const name = l.kind === "product" ? `${l.name} ${l.detail}` : l.name;
    let row = `${l.qty}x ${name} - ${formatPrice(l.subtotal)}`;
    if (l.includes) row += `\n   Incluye: ${l.includes.join(", ")}`;
    return row;
  });
  return [
    "Hola, quiero realizar el siguiente pedido:", "",
    ...rows, "",
    `Total: ${formatPrice(total)}`, "",
    "¿Me pueden confirmar disponibilidad?"
  ].join("\n");
}
