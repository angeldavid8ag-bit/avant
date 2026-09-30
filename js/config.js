/* ============================================================
   CONFIGURACIÓN DEL NEGOCIO  (aquí cambias los datos del negocio)
   ============================================================ */

/* Número de WhatsApp: código de país + número, todo junto, sin "+",
   espacios ni guiones. Los pedidos del carrito se envían a este número.
   IMPORTANTE: confirma que este número tenga WhatsApp antes de publicar. */
const WHATSAPP_NUMBER = "524775811891";

/* Datos del negocio. Déjalos vacíos ("") y la página mostrará "Por definir". */
const businessInfo = {
  name: "AVANT",
  tagline: "Limpieza que da confianza · precios que convienen.",
  phone: "477 581 1891",
  email: "",
  address: "",
  schedule: "",
  social: { facebook: "", instagram: "", tiktok: "" }   // dirección completa (https://...)
};

/* Logo (se guarda en la carpeta images/). Reemplázalo por el archivo original
   de tu logo, de preferencia en formato PNG con fondo transparente o SVG. */
const brand = { logo: "images/logo-avant.png" };

/* Aviso de precios que aparece en el catálogo y en el carrito. */
const PRICE_NOTE = "Precios expresados en MXN.";

/* Ofertas y paquetes: mientras esté en false se ocultan del menú y del inicio.
   Cámbialo a true cuando agregues ofertas o paquetes en js/offers.js. */
const SHOW_PROMOTIONS = false;

/* Texto de la página "Nosotros". Escribe solo información real del negocio. */
const aboutInfo = {
  who: "AVANT es un negocio de productos de limpieza con venta por litro.",
  sells: "Limpiadores, suavizantes, detergentes, cloro con detergente, jabón para manos, limpiavidrios, destapacaños y sarricida líquido.",
  commitment: "Limpieza que da confianza.",
  service: "Envíos a domicilio: rápido, seguro y confiable. Los pedidos se confirman por WhatsApp.",
  prices: "Precios que convienen, expresados en MXN.",
  customers: [
    { name: "Hogares", text: "Productos para la limpieza de casa: ropa, manos, vidrios y pisos." },
    { name: "Negocios", text: "Productos de limpieza para tu local, oficina o negocio." },
    { name: "Presentaciones de 1 L y 5 L", text: "Elige la presentación que necesites. Si tienes dudas, escríbenos por WhatsApp." }
  ]
};

/* Conexión con un servidor (FUTURO). Vacío = la tienda usa los datos de
   js/products.js y js/offers.js, como hoy. Cuando exista una API, escribe su
   dirección sin "/" al final, por ejemplo "https://api.tu-dominio.com/api".
   Es una dirección pública: nunca pongas aquí contraseñas ni claves secretas. */
const API_BASE_URL = "";
