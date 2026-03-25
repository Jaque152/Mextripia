export interface Experience {
  id: number;
  title: string;
  description: string;
  location: string;
  image_url: string;
  category_id: number;
  categories?: { name: string; slug: string }; // Para Joins
}

export interface ServiceLevel {
  id: number;
  name: string; // Básico, Premium, Aventurero
}

export interface ActivityPackage {
  id: number;
  activity_id: number;
  level_id: number;
  price: number; // Este es el unit_price
  features: string[]; // Viene del JSONB de la BD
  service_levels?: { name: string }; // Para Joins
}

export interface Booking {
  id: string; // UUID
  customer_id: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
  customer_email?: string;
  // Campos de facturación
  rfc?: string;
  razon_social?: string;
  direccion_facturacion?: string;
  ciudad_facturacion?: string;
  estado_facturacion?: string;
  codigo_postal_facturacion?: string;
}

export interface BookingItem {
  id: number;
  booking_id: string;
  package_id: number;
  scheduled_date: string;
  pax_qty: number; //número de personas
  unit_price: number;
  // Relación para el Dashboard
  activity_packages?: {
    features: string[];
    activities: { title: string; location: string };
  };
}

export interface CustomQuote {
  id: number;
  customer_name: string;
  customer_email: string;
  phone: string;
  destination: string;
  start_date: string;
  end_date?: string;
  pax_qty: number; // Número de personas en cotización
  budget: string;
  special_requests: string;
  status: 'pending' | 'attended';
  created_at: string;
}

// --- INTERFAZ DEL CARRITO ---
export interface CartItem {
  packageId: number; // Usamos el ID del paquete real de la BD
  experience: Experience;
  levelName: string; // "Básico", "Premium", etc.
  date: string;
  people: number;
  pricePerPerson: number;
  totalPrice: number; // (pricePerPerson * people)
}

export interface Cart {
  items: CartItem[];
  total: number;
}