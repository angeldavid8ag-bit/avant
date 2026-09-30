/* Página pages/ofertas.html: productos en oferta, paquetes y compras por volumen. */

whenStoreReady(() => {
  const saleList = products.filter(isOnSale);
  document.getElementById("sale-grid").innerHTML = saleList.map(productCard).join("");
  document.getElementById("sale-empty").hidden = saleList.length > 0;

  document.getElementById("packages-block").hidden = packages.length === 0;
  if (packages.length) document.getElementById("package-grid").innerHTML = packages.map(packageCard).join("");

  wireWhatsAppLink(document.getElementById("volume-link"), "Hola, quisiera información sobre precios para compras por volumen.");
});
