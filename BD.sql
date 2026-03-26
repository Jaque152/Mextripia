-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Limpieza previa 
DROP TABLE IF EXISTS public.booking_items CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.activity_availability CASCADE;
DROP TABLE IF EXISTS public.activity_packages CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.service_levels CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.custom_quotes CASCADE;

-- Tablas de Catálogos
CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE
);

CREATE TABLE public.service_levels (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);

-- Tablas Principales de Catálogo de Tours
CREATE TABLE public.activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT,
  category_id INTEGER REFERENCES public.categories(id),
  location VARCHAR,
  image_url TEXT,
  duration VARCHAR,
  itinerary JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.activity_packages (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES public.activities(id),
  level_id INTEGER REFERENCES public.service_levels(id),
  price NUMERIC NOT NULL,
  features JSONB,
  min_pax INTEGER DEFAULT 1,
  max_pax INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de Disponibilidad (Por fecha y hora)
CREATE TABLE public.activity_availability (
  id SERIAL PRIMARY KEY,
  package_id INTEGER REFERENCES public.activity_packages(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  remaining_slots INTEGER NOT NULL,
  UNIQUE(package_id, scheduled_date, scheduled_time)
);

-- Tablas de Clientes y Cotizaciones
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  phone VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.custom_quotes (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  phone VARCHAR,
  destination VARCHAR,
  pax_qty INTEGER,
  budget VARCHAR,
  special_requests TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.contact_messages (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tablas de Operación (Carrito y Reservas)
CREATE TABLE public.cart_items (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR NOT NULL,
  package_id INTEGER REFERENCES public.activity_packages(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  pax_qty INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.customers(id),
  session_id VARCHAR, -- Opcional, para rastrear de qué sesión vino
  total_amount NUMERIC NOT NULL,
  payment_status VARCHAR DEFAULT 'pending',
  rfc VARCHAR,
  razon_social VARCHAR,
  direccion_facturacion TEXT,
  ciudad_facturacion VARCHAR,
  estado_facturacion VARCHAR,
  codigo_postal_facturacion VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.booking_items (
  id SERIAL PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id),
  package_id INTEGER REFERENCES public.activity_packages(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  pax_qty INTEGER DEFAULT 1,
  unit_price NUMERIC NOT NULL
);