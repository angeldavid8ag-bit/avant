-- =====================================================================
--  Esquema PROPUESTO de base de datos (PostgreSQL) para la tienda.
--  Es un diseño para el futuro: hoy el sitio usa js/products.js.
--  No contiene datos, contraseñas ni claves.
--  Reglas de diseño:
--    * Los precios se guardan en pesos con 2 decimales (numeric), nunca en float.
--    * Un pedido guarda una COPIA del nombre y precio de cada producto en el
--      momento de la compra (si mañana cambia el precio, el pedido no cambia).
--    * Los productos no se borran: se desactivan (is_active = false).
-- =====================================================================

create table categories (
  id          bigint generated always as identity primary key,
  slug        text    not null unique,          -- "limpiadores" (para URLs amigables)
  name        text    not null,
  description text    not null default '',
  icon        text    not null default '',
  sort_order  integer not null default 0,
  is_active   boolean not null default true
);

create table products (
  id             bigint generated always as identity primary key,
  category_id    bigint not null references categories (id),
  name           text   not null,
  description    text   not null default '',
  presentation   text   not null,               -- "1 L", "5 L"
  price          numeric(10, 2) not null check (price >= 0),
  discount_price numeric(10, 2) check (discount_price is null or (discount_price >= 0 and discount_price < price)),
  on_sale        boolean not null default false,
  image_url      text   not null default '',
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  check (on_sale = false or discount_price is not null)
);
create index products_category_idx on products (category_id) where is_active;

-- Existencias (1 fila por producto). Cada cambio se registra en inventory_movements.
create table inventory (
  product_id bigint primary key references products (id),
  stock      integer not null default 0 check (stock >= 0),
  updated_at timestamptz not null default now()
);

create table inventory_movements (
  id         bigint generated always as identity primary key,
  product_id bigint  not null references products (id),
  change     integer not null check (change <> 0),   -- +10 entrada, -2 salida
  reason     text    not null check (reason in ('compra', 'venta', 'ajuste', 'merma')),
  created_at timestamptz not null default now()
);

-- Paquetes (varios productos a un precio fijo)
create table packages (
  id          bigint generated always as identity primary key,
  slug        text   not null unique,
  name        text   not null,
  description text   not null default '',
  icon        text   not null default '',
  price       numeric(10, 2) not null check (price >= 0),
  is_active   boolean not null default true
);

create table package_items (
  package_id bigint  not null references packages (id) on delete cascade,
  product_id bigint  not null references products (id),
  qty        integer not null default 1 check (qty > 0),
  primary key (package_id, product_id)
);

-- Promociones con vigencia (para después: descuentos por temporada o por volumen)
create table promotions (
  id             bigint generated always as identity primary key,
  name           text not null,
  discount_type  text not null check (discount_type in ('percentage', 'fixed_price')),
  discount_value numeric(10, 2) not null check (discount_value > 0),
  starts_at      timestamptz,
  ends_at        timestamptz,
  is_active      boolean not null default true,
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table promotion_products (
  promotion_id bigint not null references promotions (id) on delete cascade,
  product_id   bigint not null references products (id),
  primary key (promotion_id, product_id)
);

-- Clientes (opcional: se pueden tomar pedidos sin registrar cliente)
create table customers (
  id         bigint generated always as identity primary key,
  name       text not null,
  phone      text,
  email      text unique,
  created_at timestamptz not null default now()
);

-- Pedidos
create table orders (
  id          bigint generated always as identity primary key,
  customer_id bigint references customers (id),
  status      text not null default 'pending' check (status in ('pending', 'confirmed', 'delivered', 'cancelled')),
  total       numeric(10, 2) not null check (total >= 0),
  notes       text not null default '',
  created_at  timestamptz not null default now()
);
create index orders_status_created_idx on orders (status, created_at desc);

create table order_items (
  id          bigint generated always as identity primary key,
  order_id    bigint not null references orders (id) on delete cascade,
  product_id  bigint references products (id),
  package_id  bigint references packages (id),
  name        text    not null,                     -- copia del nombre al comprar
  unit_price  numeric(10, 2) not null check (unit_price >= 0),  -- copia del precio al comprar
  qty         integer not null check (qty > 0),
  check ((product_id is not null) <> (package_id is not null))  -- es producto O paquete
);
create index order_items_order_idx on order_items (order_id);

-- Usuarios del panel administrativo. La contraseña se guarda SOLO como hash
-- (bcrypt/argon2), nunca en texto.
create table admin_users (
  id            bigint generated always as identity primary key,
  email         text not null unique,
  password_hash text not null,
  role          text not null default 'staff' check (role in ('admin', 'staff')),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);
