"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Experience, ActivityPackage } from "@/lib/types"; 
import {
  MapPin, Check, Minus, Plus, ShoppingCart, Loader2
} from "lucide-react";

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [packages, setPackages] = useState<ActivityPackage[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [people, setPeople] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<ActivityPackage | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadFullDetail() {
      if (!params.id) return;
      setLoading(true);
      try {
        const { data: activity } = await supabase
          .from('activities')
          .select('*, categories(name, slug)')
          .eq('id', params.id)
          .single();

        const { data: paks } = await supabase
          .from('activity_packages')
          .select('*, service_levels(name)')
          .eq('activity_id', params.id)
          .order('level_id', { ascending: true });

        if (activity) {
          setExperience({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            location: activity.location,
            image_url: activity.image_url,
            category_id: activity.category_id,
            categories: activity.categories
          });
        }
        
        if (paks) {
          const typedPaks = paks as unknown as ActivityPackage[];
          setPackages(typedPaks);
          setSelectedPackage(typedPaks[0]);
        }
      } catch (error) {
        console.error("Error loadFullDetail:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFullDetail();
  }, [params.id]);

  const totalPrice = useMemo(() => {
    if (!selectedPackage) return 0;
    return Number(selectedPackage.price) * people;
  }, [selectedPackage, people]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency", currency: "MXN", minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!experience || !selectedDate || !selectedPackage) return;
    setIsAdding(true);

    addToCart({
      packageId: selectedPackage.id,
      experience: experience,
      date: selectedDate,
      people: people,
      levelName: selectedPackage.service_levels?.name || "Básico",
      pricePerPerson: Number(selectedPackage.price),
    });

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 500);
  };

  const minDateStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  if (!experience) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl bg-stone-100">
                <img src={experience.image_url} alt={experience.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                    {experience.categories?.name || "Aventura"}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-stone-500 font-medium">
                    <MapPin className="w-4 h-4" /> {experience.location}
                  </span>
                </div>
                <h1 className="text-4xl font-serif font-bold mb-4 text-stone-900">{experience.title}</h1>
                <p className="text-lg text-stone-600 leading-relaxed">{experience.description}</p>
              </div>

              <div className="pt-8 border-t border-stone-100">
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Inclusiones del nivel {selectedPackage?.service_levels?.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedPackage?.features?.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <Card className="border-none shadow-2xl bg-stone-50/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-black text-orange-700">
                        {formatPrice(totalPrice)}
                      </span>
                      <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">Subtotal</span>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-500 tracking-widest">Fecha</label>
                        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={minDateStr} className="rounded-xl h-12 bg-white" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-500 tracking-widest">Personas</label>
                        <div className="flex items-center justify-between bg-white p-1 rounded-xl border h-12">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg" onClick={() => setPeople(Math.max(1, people - 1))}><Minus className="w-4 h-4"/></Button>
                          <span className="font-bold text-lg">{people}</span>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg" onClick={() => setPeople(people + 1)}><Plus className="w-4 h-4"/></Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-stone-500 tracking-widest">Nivel de Paquete</label>
                        {packages.map((pkg) => (
                          <div 
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                              selectedPackage?.id === pkg.id ? "border-orange-600 bg-white shadow-sm" : "border-stone-100 bg-white/50 hover:border-orange-200"
                            }`}
                          >
                            <span className="font-bold text-sm text-stone-800">{pkg.service_levels?.name}</span>
                            <span className="text-xs font-black text-orange-600">{formatPrice(Number(pkg.price))}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-full h-14 mt-8 shadow-lg shadow-orange-100 gap-2 font-bold text-lg"
                      onClick={handleAddToCart}
                      disabled={!selectedDate || isAdding}
                    >
                      {isAdding ? <Loader2 className="animate-spin" /> : <ShoppingCart className="w-5 h-5" />} 
                      {isAdding ? "Agregando..." : "Reservar Ahora"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}