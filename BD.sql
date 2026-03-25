
CREATE TABLE public.activities (
  id integer NOT NULL DEFAULT nextval('activities_id_seq'::regclass),
  title character varying NOT NULL,
  description text,
  category_id integer,
  location character varying,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT activities_pkey PRIMARY KEY (id),
  CONSTRAINT activities_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.activity_packages (
  id integer NOT NULL DEFAULT nextval('activity_packages_id_seq'::regclass),
  activity_id integer,
  level_id integer,
  price numeric NOT NULL,
  features jsonb,
  CONSTRAINT activity_packages_pkey PRIMARY KEY (id),
  CONSTRAINT activity_packages_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id),
  CONSTRAINT activity_packages_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.service_levels(id)
);
CREATE TABLE public.booking_items (
  id integer NOT NULL DEFAULT nextval('booking_items_id_seq'::regclass),
  booking_id uuid,
  package_id integer,
  scheduled_date date NOT NULL,
  pax_qty integer DEFAULT 1,
  unit_price numeric NOT NULL,
  CONSTRAINT booking_items_pkey PRIMARY KEY (id),
  CONSTRAINT booking_items_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id),
  CONSTRAINT booking_items_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.activity_packages(id)
);
CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  total_amount numeric NOT NULL,
  payment_status character varying DEFAULT 'pending'::character varying,
  billing_address text,
  created_at timestamp with time zone DEFAULT now(),
  rfc character varying,
  razon_social character varying,
  direccion_facturacion text,
  ciudad_facturacion character varying,
  estado_facturacion character varying,
  codigo_postal_facturacion character varying,
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id)
);
CREATE TABLE public.cart_items (
  id integer NOT NULL DEFAULT nextval('cart_items_id_seq'::regclass),
  session_id character varying NOT NULL,
  package_id integer,
  scheduled_date date NOT NULL,
  pax_qty integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cart_items_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.activity_packages(id)
);
CREATE TABLE public.categories (
  id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contact_messages (
  id integer NOT NULL DEFAULT nextval('contact_messages_id_seq'::regclass),
  full_name character varying,
  phone character varying,
  email character varying,
  message text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.custom_quotes (
  id integer NOT NULL DEFAULT nextval('custom_quotes_id_seq'::regclass),
  customer_name character varying NOT NULL,
  customer_email character varying NOT NULL,
  destination character varying,
  pax_qty integer,
  budget character varying,
  special_requests text,
  status character varying DEFAULT 'pending'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  phone character varying,
  start_date date,
  end_date date,
  CONSTRAINT custom_quotes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  first_name character varying NOT NULL,
  last_name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  phone character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.service_levels (
  id integer NOT NULL DEFAULT nextval('service_levels_id_seq'::regclass),
  name character varying NOT NULL UNIQUE,
  CONSTRAINT service_levels_pkey PRIMARY KEY (id)
);