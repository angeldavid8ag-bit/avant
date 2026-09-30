/* CATÁLOGO DE AVANT
   Productos y precios tomados de la lista de precios de AVANT (precios en MXN).
   Para cambiar un precio o agregar un producto, edita este archivo.

   - price: precio de la presentación completa (un envase de 5 L cuesta lo que dice, no "por litro").
   - stock: 99 significa "disponible" (aún no se lleva conteo de inventario).
            Pon stock: 0 para mostrar el producto como "Agotado".
   - image: ruta de la foto, por ejemplo "images/products/pinol-1l.jpg".
            Si está vacío se muestra el icono de la categoría. */

const categories = [
  { id: "limpiadores",  name: "Limpiadores",             icon: "🧽", description: "Limpiadores y limpiavidrios." },
  { id: "suavizantes",  name: "Suavizantes",             icon: "🌸", description: "Suavizantes en 1 L y 5 L." },
  { id: "detergentes",  name: "Detergentes",             icon: "🧺", description: "Detergentes por litro." },
  { id: "cloro",        name: "Cloro",                   icon: "💧", description: "Cloro con detergente." },
  { id: "jabones",      name: "Jabones",                 icon: "🧼", description: "Jabón para manos." },
  { id: "especiales",   name: "Destapacaños y sarricida", icon: "🧴", description: "Destapacaños y sarricida líquido." }
];

const products = [
  { id: 1, name: "Pinol", category: "limpiadores", price: 20, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 2, name: "Jabón para manos Durazno/Menta", category: "jabones", price: 30, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 3, name: "Suavizante Momentos Mágicos", category: "suavizantes", price: 29, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 4, name: "Suavizante Momentos Mágicos", category: "suavizantes", price: 145, presentation: "5 L", image: "", description: "Venta por litro. Presentación de 5 L.", stock: 99 },
  { id: 5, name: "Destapacaños", category: "especiales", price: 27, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 6, name: "Cloro con detergente", category: "cloro", price: 22, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 7, name: "Detergente tipo Vel Rosita", category: "detergentes", price: 32, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 8, name: "Detergente tipo Mas Color", category: "detergentes", price: 30, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 9, name: "Sarricida líquido", category: "especiales", price: 24, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 10, name: "Limpiavidrios tipo Windex", category: "limpiadores", price: 27, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 11, name: "Limpiador tipo Fabuloso Menta/Floral", category: "limpiadores", price: 22, presentation: "1 L", image: "", description: "Venta por litro. Presentación de 1 L.", stock: 99 },
  { id: 12, name: "Limpiador tipo Fabuloso Lavanda", category: "limpiadores", price: 110, presentation: "5 L", image: "", description: "Venta por litro. Presentación de 5 L.", stock: 99 }
];
