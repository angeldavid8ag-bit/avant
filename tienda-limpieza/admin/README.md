# Panel administrativo (reservado)

Esta carpeta está **reservada** para el futuro panel de administración (`/admin`).
Todavía no hay nada desarrollado aquí, a propósito.

## Por qué no hay una página `/admin` todavía

GitHub Pages solo sirve archivos estáticos: **no puede pedir contraseña ni proteger nada**.
Una página `/admin` publicada aquí la vería cualquier persona que conozca la dirección, y
cualquier "contraseña" escrita en JavaScript quedaría a la vista de todos.
El panel real necesita un servidor con inicio de sesión (ver `docs/ARQUITECTURA.md`).

## Qué tendrá el panel (plan)

- Productos: crear, editar, ocultar, cambiar precio y fotos.
- Categorías, paquetes y promociones.
- Inventario (existencias).
- Pedidos y clientes.
- Usuarios y roles (administrador / personal).
