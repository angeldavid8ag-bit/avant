/* Página pages/contacto.html: los datos vienen de businessInfo en js/config.js. */

const pending = '<span class="pending">Por definir</span>';
const digitsOnly = (s) => String(s).replace(/[^\d+]/g, "");

const socialLinks = Object.entries(businessInfo.social || {})
  .filter(([, url]) => url)
  .map(([name, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(name.charAt(0).toUpperCase() + name.slice(1))}</a></li>`)
  .join("");

const cards = [
  ["WhatsApp",
    `<p>${isWhatsAppConfigured() ? "+" + whatsappDigits() : pending}</p>
     <p><a id="contact-wa" class="btn btn-primary" href="#">Escribir por WhatsApp</a></p>`],
  ["Teléfono",  businessInfo.phone ? `<p><a href="tel:${esc(digitsOnly(businessInfo.phone))}">${esc(businessInfo.phone)}</a></p>` : `<p>${pending}</p>`],
  ["Correo",    businessInfo.email ? `<p><a href="mailto:${esc(businessInfo.email)}">${esc(businessInfo.email)}</a></p>` : `<p>${pending}</p>`],
  ["Horarios",  `<p>${businessInfo.schedule ? esc(businessInfo.schedule) : pending}</p>`],
  ["Redes sociales", socialLinks ? `<ul class="social-list">${socialLinks}</ul>` : `<p>${pending}</p>`],
  ["Ubicación", `<p>${businessInfo.address ? esc(businessInfo.address) : pending}</p>`]
];

document.getElementById("contact-grid").innerHTML = cards
  .map(([title, body]) => `<li class="info-card"><h2>${title}</h2>${body}</li>`)
  .join("");

wireWhatsAppLink(document.getElementById("contact-wa"), WA_DEFAULT_MESSAGE);
