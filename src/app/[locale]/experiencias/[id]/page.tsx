"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from '@/lib/supabase';
import { Loader2, Calendar as CalendarIcon, MapPin, Clock, Utensils, CheckCircle2, ChevronRight } from "lucide-react";
import { T } from "@/components/T";
import { useCart } from "@/context/CartContext";
import { ActivityPackage, Experience } from "@/lib/types";

export default function ExperienceDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [pax, setPax] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<ActivityPackage | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      const { data, error } = await supabase
        .from('activities_mextripia')
        .select(`*, categories:categories_mextripia(name, slug), packages:activity_packages_mextripia(*)`)
        .eq('id', params.id as string)
        .single();

      if (data) {        
        if (data.packages) data.packages.sort((a: ActivityPackage, b: ActivityPackage) => a.min_pax - b.min_pax);
        setExperience(data);
      }
      setLoading(false);
    }
    fetchDetail();
  }, [params.id]);

  useEffect(() => {
    if (experience?.packages?.length) {
      const matched = experience.packages.find((pkg) => pax >= pkg.min_pax && pax <= (pkg.max_pax || 999));
      setSelectedPackage(matched || experience.packages[experience.packages.length - 1]);
    }
  }, [pax, experience]);

  const handleAddToCart = () => {
    // Le agregamos !experience a esta validación
    if (!selectedDate || !selectedPackage || !experience) return; 
    
    const cartItem = {
      packageId: selectedPackage.id,
      experience: experience, // ¡TypeScript ya sabe que no es null!
      levelName: selectedPackage.package_name,
      date: selectedDate,
      people: pax,
      pricePerPerson: selectedPackage.price,
      totalPrice: selectedPackage.price * pax
    };
    
    addToCart(cartItem);
    router.push(`/${locale}/carrito`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
  if (!experience) return <div className="min-h-screen flex items-center justify-center bg-background"><T>Experiencia no encontrada</T></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contenido (Izquierda) */}
            <div className="w-full lg:w-7/12 animate-fade-in-up">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">
                {experience.location}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-foreground leading-tight mb-10">
                {experience.title}
              </h1>

              <div className="relative aspect-video w-full rounded-[var(--radius)] overflow-hidden mb-12 shadow-xl">
                <Image src={experience.images?.[0] || '/placeholder.jpg'} alt={experience.title} fill className="object-cover" priority />
              </div>

              <div className="space-y-12">
                <section>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-6"><T>La Experiencia</T></h3>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                    {experience.description}
                  </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/30 p-8 rounded-[var(--radius)] border border-border/50">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground"><T>Duración</T></p>
                      <p className="text-sm font-medium text-foreground">{experience.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground"><T>Encuentro</T></p>
                      <p className="text-sm font-medium text-foreground">{experience.location}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-foreground mb-8"><T>Inclusiones</T></h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.included_general?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Sidebar de Reserva (Derecha) */}
            <div className="w-full lg:w-5/12">
              <div className="sticky top-32 bg-white p-10 rounded-[var(--radius)] border border-border shadow-sm">
                <h3 className="text-2xl font-serif text-foreground mb-8 text-center"><T>Reservar Expedición</T></h3>
                
                <div className="space-y-6">
                  {/* Selector de Fecha */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block"><T>Fecha</T></label>
                    <input 
                      type="date" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Selector de Personas */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block"><T>Comensales</T></label>
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button onClick={() => setPax(Math.max(1, pax - 1))} className="px-4 py-3 hover:bg-muted transition-colors text-foreground">-</button>
                      <input 
                        type="number" 
                        value={pax}
                        readOnly
                        className="w-full text-center bg-transparent text-sm font-bold text-foreground outline-none"
                      />
                      <button onClick={() => setPax(pax + 1)} className="px-4 py-3 hover:bg-muted transition-colors text-foreground">+</button>
                    </div>
                  </div>

                  {/* Paquete detectado */}
                  {selectedPackage && (
                    <div className="py-4 border-t border-b border-border/50">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{selectedPackage.package_name}</p>
                          <p className="text-xs text-muted-foreground"><T>Precio por persona</T></p>
                        </div>
                        <p className="text-xl font-serif text-foreground">
                          {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(selectedPackage.price)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Total y Acción */}
                  <div className="pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground"><T>Total</T></span>
                      <span className="text-3xl font-serif text-primary">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format((selectedPackage?.price || 0) * pax)}
                      </span>
                    </div>
                    <p className="text-[9px] text-right uppercase tracking-widest text-muted-foreground mb-6">
                      <T> IVA Incluido</T>
                    </p>
                    <button 
                      onClick={handleAddToCart}
                      disabled={!selectedDate}
                      className="w-full bg-foreground text-background py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all duration-500 disabled:opacity-30 flex items-center justify-center gap-3 group"
                    >
                      <T>Añadir a la Bolsa</T>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}