/* Página pages/nosotros.html: el texto viene de aboutInfo en js/config.js. */

const blocks = [
  ["Quiénes somos", aboutInfo.who],
  ["Qué vendemos", aboutInfo.sells],
  ["Compromiso con la calidad", aboutInfo.commitment],
  ["Atención al cliente", aboutInfo.service],
  ["Precios competitivos", aboutInfo.prices]
];

document.getElementById("about-blocks").innerHTML = blocks
  .map(([title, text]) => `<li class="info-card"><h2>${title}</h2><p>${esc(text)}</p></li>`)
  .join("");

document.getElementById("about-customers").innerHTML = aboutInfo.customers
  .map((c) => `<li class="info-card"><h3>${esc(c.name)}</h3><p>${esc(c.text)}</p></li>`)
  .join("");
