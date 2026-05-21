"use client";
import { useLocale } from 'next-intl';
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from '@/lib/supabase';
import { Loader2, MapPin, ArrowRight } from "lucide-react";
import { Experience, SupabaseExperienceResponse } from "@/lib/types";
import { T } from "@/components/T";

type ExperienceWithPrice = Experience & { displayPrice: number };

function ExperienciasContent() {
  const locale = useLocale();
  const [experiences, setExperiences] = useState<ExperienceWithPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: actData, error } = await supabase
          .from('activities_mextripia')
          .select(`
            id, title, slug, description, location, images, category_id,
            categories:categories_mextripia(id, name, slug),
            activity_packages:activity_packages_mextripia(price)
          `);

        if (error) return console.error(error);

        if (actData) {
          const mappedData: ExperienceWithPrice[] = (actData as unknown as SupabaseExperienceResponse[]).map((item) => ({
            ...item,
            categories: item.categories || undefined,
            description: item.description || "",
            images: item.images || [],
            displayPrice: item.activity_packages?.[0]?.price || 0
          }));
          setExperiences(mappedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 animate-spin text-primary" strokeWidth={1.5} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-40 pb-24 relative">
        
        {/* Encabezado Editorial */}
        <div className="container mx-auto px-6 max-w-7xl mb-20 text-center animate-fade-in-up">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4 block">
            <T>Curaduría Culinaria</T>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight mb-6">
            <T>Nuestras</T> <span className="italic text-primary"><T>Expediciones.</T></span>
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto font-light leading-relaxed">
            <T>Diseñamos inmersiones gastronómicas exclusivas. Desde la cosecha en la tierra hasta las mesas más reservadas de México.</T>
          </p>
        </div>

        {/* Grid Estilo Revista */}
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {experiences.map((exp, idx) => {
              const thumbImage = exp.images?.length > 0 ? exp.images[0] : '/placeholder.jpg';

              return (
                <Link key={exp.id} href={`/${locale}/experiencias/${exp.id}`} className="group block animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="h-full flex flex-col">
                    {/* Imagen con Aspect Ratio elegante */}
                    <div className="relative aspect-[3/4] w-full rounded-[var(--radius)] overflow-hidden mb-6 shadow-sm">
                      <Image 
                        src={thumbImage} 
                        alt={exp.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Badge de Precio Minimalista */}
                      <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-foreground">
                          {formatPrice(exp.displayPrice)}
                        </span>
                        {/* Nota de IVA en el grid */}
                        <span className="text-[8px] uppercase tracking-tighter text-muted-foreground mt-1">
                          <T> IVA Incluido</T>
                        </span>
                      </div>
                    </div>
                    
                    {/* Info Refinada */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                        <MapPin className="w-3 h-3" />
                        <T>{exp.location}</T>
                      </div>
                      <h3 className="text-2xl font-serif text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                        <T>{exp.title}</T>
                      </h3>
                      
                      <div className="mt-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-secondary overflow-hidden">
                        <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-500"><T>Explorar</T></span>
                        <ArrowRight className="w-3 h-3 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ExperienciasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>}>
      <ExperienciasContent />
    </Suspense>
  );
}