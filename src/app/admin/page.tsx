"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Booking, CustomQuote, BookingItem } from "@/lib/types";
import {
  LogOut, DollarSign, 
  Clock, MessageSquare, Eye,
  ShoppingBag, FileText, Loader2, CheckCircle2, MapPin, X, Info
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<CustomQuote[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingItems, setSelectedBookingItems] = useState<BookingItem[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      const { data: qData } = await supabase.from('custom_quotes').select('*').order('created_at', { ascending: false });
      
      setReservations((bData as Booking[]) || []);
      setQuotes((qData as CustomQuote[]) || []);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, fetchDashboardData]);

  const handleOpenDetails = async (bookingId: string) => {
    setIsModalOpen(true);
    setLoadingDetails(true);
    
    const { data, error } = await supabase
      .from('booking_items')
      .select(`
        *,
        activity_packages (
          price,
          features,
          activities (
            title,
            description,
            location
          )
        )
      `)
      .eq('booking_id', bookingId);
    
    if (!error && data) {
      setSelectedBookingItems(data as unknown as BookingItem[]);
    }
    setLoadingDetails(false);
  };

  const updateQuoteStatus = async (quoteId: number, newStatus: 'pending' | 'attended') => {
    const { error } = await supabase.from('custom_quotes').update({ status: newStatus }).eq('id', quoteId);
    if (!error) {
      setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status: newStatus } : q));
    }
  };

  const formatPrice = (p: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);
  const formatDate = (d: string) => new Date(d).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

  if (authLoading || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="animate-spin w-10 h-10 text-orange-600" />
      </div>
    );
  }

  const totalRevenue = reservations.reduce((sum: number, r: Booking) => sum + (Number(r.total_amount) || 0), 0);

  return (
    <div className="min-h-screen bg-stone-100/40 pb-20 relative">
      
      {/* --- MODAL MANUAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-stone-50/50">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-800">Especificaciones de Reserva</h3>
                <p className="text-xs text-stone-400 uppercase tracking-tighter">Desglose de actividades</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {loadingDetails ? (
                <div className="flex flex-col items-center py-20 gap-3">
                  <Loader2 className="animate-spin text-orange-600" />
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedBookingItems.map((item, idx) => {
                    const activity = item.activity_packages?.activities;
                    const pkg = item.activity_packages;
                    return (
                      <div key={idx} className="p-6 bg-stone-50 rounded-3xl border border-stone-200/60 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-600" />
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-stone-800">{activity?.title || "Actividad"}</h4>
                            <p className="text-sm text-orange-600 font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3"/> {activity?.location}
                            </p>
                          </div>
                          <Badge className="bg-white border-stone-200 text-stone-600">
                            {item.pax_qty} {item.pax_qty === 1 ? 'Viajero' : 'Viajeros'}
                          </Badge>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-200/50">
                          <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase mb-2">Incluye:</p>
                            <ul className="text-xs space-y-1 text-stone-600">
                              {pkg?.features?.map((f: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-500" /> {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="text-right flex flex-col justify-end">
                            <p className="text-[10px] font-bold text-stone-400 uppercase">Subtotal</p>
                            <p className="text-2xl font-black text-stone-800">{formatPrice(item.unit_price * item.pax_qty)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="p-6 border-t bg-stone-50/50 flex justify-center">
              <Button onClick={() => setIsModalOpen(false)} className="px-10 bg-stone-800 hover:bg-black rounded-full transition-all">Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center transition-transform hover:scale-110 duration-300">
              <img src="/logo 2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-xl text-stone-800 leading-none">Zenith México</h1>
              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Administrador</p>
            </div>
          </div>
          <Button variant="ghost" onClick={logout} className="text-red-500 gap-2 font-bold text-xs uppercase tracking-wider">
            <LogOut className="w-4 h-4" /> Salir
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Ventas Totales", val: formatPrice(totalRevenue), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Reservas", val: reservations.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Cotizaciones", val: quotes.length, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Pendientes", val: quotes.filter(q => q.status === 'pending').length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((s, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${s.bg}`}><s.icon className={`w-6 h-6 ${s.color}`} /></div>
                <div><p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{s.label}</p><p className="text-2xl font-bold text-stone-800">{s.val}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 text-stone-800 flex items-center gap-2"><ShoppingBag className="text-orange-600"/> Ventas Reales</h2>
            <div className="space-y-4">
              {reservations.map((res) => (
                <Card key={res.id} className="border-none shadow-sm bg-white hover:ring-2 ring-orange-100 transition-all overflow-hidden group">
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-stone-800">{res.customer_email || "Cliente"}</p>
                      <p className="text-[10px] text-stone-400 font-mono mt-1">FOLIO: {res.id.slice(0,8).toUpperCase()}</p>
                    </div>
                    <Button onClick={() => handleOpenDetails(res.id)} className="rounded-full bg-stone-100 text-stone-600 hover:bg-orange-600 hover:text-white transition-all">
                      <Eye className="w-4 h-4 mr-2" /> Especificaciones
                    </Button>
                  </div>
                  <div className="bg-stone-50/50 px-6 py-4 flex justify-between items-center border-t border-stone-100">
                    <span className="text-[10px] text-stone-400 font-bold">{formatDate(res.created_at)}</span>
                    <span className="font-black text-stone-800 text-xl">{formatPrice(res.total_amount)}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 text-stone-800 flex items-center gap-2"><MessageSquare className="text-orange-600"/> Cotizaciones</h2>
            <div className="space-y-4">
              {quotes.map((quote) => (
                <Card key={quote.id} className={`border-none shadow-sm transition-all ${quote.status === 'attended' ? 'opacity-50 grayscale' : 'bg-white hover:shadow-md'}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-stone-800 text-lg">{quote.customer_name}</h3>
                        <p className="text-xs text-orange-600 font-bold flex items-center gap-1"><MapPin className="w-3 h-3"/> {quote.destination}</p>
                      </div>
                      <Badge className={quote.status === 'pending' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-none' : 'bg-green-100 text-green-700 hover:bg-green-100 border-none'}>
                        {quote.status === 'pending' ? 'Pendiente' : 'Atendido'}
                      </Badge>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-2xl text-sm text-stone-500 italic mb-4 border border-stone-100 font-light">
                      <Info className="w-4 h-4 mb-2 text-stone-300" />
                      "{quote.special_requests || "Sin peticiones extra"}"
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                      <span className="text-[10px] text-stone-400 font-bold">{formatDate(quote.created_at)}</span>
                      {quote.status === 'pending' ? (
                        <Button 
                          onClick={() => updateQuoteStatus(quote.id, 'attended')} 
                          className="bg-stone-800 hover:bg-black text-white rounded-full h-10 text-xs px-8 shadow-md"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Atender
                        </Button>
                      ) : (
                        <p className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Procesada</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}