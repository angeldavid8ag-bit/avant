/* Buscar, filtrar y ordenar. Son funciones "puras": reciben la lista y los
   filtros, y devuelven una lista nueva. Así funcionarán igual cuando los
   productos vengan de una API. */

// Quita mayúsculas y acentos: "Baño" y "bano" se consideran iguales.
const normalize = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function filterProducts(list, f) {
  const query = normalize(f.search.trim());

  const result = list.filter((p) => {
    const categoryName = getCategory(p.category)?.name ?? "";
    const matchesSearch = !query || normalize(`${p.name} ${categoryName} ${p.description}`).includes(query);
    const matchesCategory = f.category === "todas" || p.category === f.category;
    const matchesAvailability =
      f.availability === "todos" ||
      (f.availability === "disponible" ? p.stock > 0 : p.stock === 0);
    const matchesPresentation = f.presentation === "todas" || p.presentation === f.presentation;
    return matchesSearch && matchesCategory && matchesAvailability && matchesPresentation;
  });

  if (f.sort === "asc") result.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  if (f.sort === "desc") result.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  return result;
}
