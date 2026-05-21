"use client";

import { useLocale } from 'next-intl';
import { T } from "@/components/T";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing"; 
import { Trophy, CalendarDays, MapPin, MonitorPlay, UtensilsCrossed, Crown, CheckCircle2, Info } from "lucide-react";
import Image from 'next/image';

export default function FifaPage() {
  const locale = useLocale();

  // 1. Información parafraseada de la imagen de "Experiencias disponibles" (Fan Zones)
  const fanZones = [
    {
      title: "Inmersión Temática",
      subtitle: "La emoción en su estado puro",
      icon: <MonitorPlay className="w-6 h-6" />,
      features: [
        "Transmisiones en vivo a través de pantallas de formato monumental.",
        "Mobiliario tipo lounge y asientos ergonómicos para máximo confort.",
        "Ambientación inmersiva con elementos representativos de las selecciones.",
        "Zonas de actividad física con dinámicas de fútbol reducido.",
        "Espacios fotográficos tematizados para capturar el momento."
      ]
    },
    {
      title: "Ruta Culinaria Mundialista",
      subtitle: "Sabores que acompañan la pasión",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      features: [
        "Todos los beneficios de la Inmersión Temática.",
        "Estaciones gastronómicas combinando la alta cocina mexicana e internacional.",
        "Mixología de autor inspirada en los países competidores.",
        "Catas y maridajes con destilados de agave y cervezas artesanales.",
        "Gestión prioritaria para cenas post-partido en restaurantes aliados."
      ]
    },
    {
      title: "Hospitalidad Élite Experiencial",
      subtitle: "Exclusividad sin compromisos",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Acceso total a las amenidades de los niveles anteriores.",
        "Salas privadas equipadas con mobiliario de diseño premium.",
        "Atención personalizada con servicio de meseros dedicados.",
        "Sesiones musicales en vivo y DJ sets marcando el ritmo del evento.",
        "Posibilidad de organizar encuentros privados con figuras históricas del deporte."
      ]
    }
  ];

  // 2. Información parafraseada de la imagen de "Restaurantes / Bares en CDMX"
  const alliedVenues = [
    "Flamingos Restaurante y Marisquería",
    "Sonora Grill (Sucursal Nápoles)",
    "Pinche Gringo BBQ",
    "Papa Bill's Stadium (Polanco)",
    "Hooters",
    "Buffalo Wild Wings",
    "Alboa",
    "Sports & Chips"
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-4 block animate-fade-in-up">
              <T>Copa Mundial 2026</T>
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-8 animate-fade-in-up delay-150 leading-tight">
              <T>El fervor del juego.</T><br />
              <span className="italic text-primary"><T>El lujo del detalle.</T></span>
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed animate-fade-in-up delay-300">
              <T>Viva la máxima justa deportiva a través de una curaduría de espacios, gastronomía y hospitalidad diseñada exclusivamente para paladares y espectadores exigentes.</T>
            </p>
          </div>
        </div>
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* SECCIÓN 1: FECHAS CLAVE (Parafraseado de la imagen del balón y la copa) */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-background/20">
            
            <div className="pt-8 md:pt-0 md:px-8 first:pl-0 flex flex-col items-center md:items-start">
              <CalendarDays className="w-8 h-8 text-secondary mb-6" />
              <h3 className="text-2xl font-serif mb-3"><T>Duración del Torneo</T></h3>
              <p className="text-background/70 font-light leading-relaxed">
                <T>La celebración global tomará lugar del jueves 11 de junio al domingo 19 de julio de 2026, marcando un hito en la historia del deporte.</T>
              </p>
            </div>

            <div className="pt-8 md:pt-0 md:px-8 flex flex-col items-center md:items-start">
              <MapPin className="w-8 h-8 text-secondary mb-6" />
              <h3 className="text-2xl font-serif mb-3"><T>El Gran Inicio</T></h3>
              <p className="text-background/70 font-light leading-relaxed">
                <T>El silbatazo inaugural resonará el 11 de junio de 2026 en el majestuoso Estadio Azteca, ubicado en el corazón de la Ciudad de México.</T>
              </p>
            </div>

            <div className="pt-8 md:pt-0 md:px-8 flex flex-col items-center md:items-start">
              <Trophy className="w-8 h-8 text-secondary mb-6" />
              <h3 className="text-2xl font-serif mb-3"><T>La Cumbre Final</T></h3>
              <p className="text-background/70 font-light leading-relaxed">
                <T>El campeón se coronará el domingo 19 de julio de 2026 en el MetLife Stadium, en East Rutherford, Nueva Jersey.</T>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 2: NIVELES DE FAN ZONE (Parafraseado de la imagen "Experiencias Disponibles") */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4 block"><T>Centros de Celebración</T></span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6"><T>Entornos diseñados para la pasión</T></h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              <T>Más allá de los estadios, hemos estructurado tres niveles de hospitalidad para que viva cada encuentro rodeado de un ambiente vibrante, comodidad absoluta y propuestas culinarias excepcionales.</T>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fanZones.map((zone, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 flex flex-col group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                  {zone.icon}
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-2"><T>{zone.title}</T></h3>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-8"><T>{zone.subtitle}</T></p>
                
                <ul className="space-y-4 flex-1">
                  {zone.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 opacity-80" />
                      <span className="text-sm text-muted-foreground leading-relaxed"><T>{feature}</T></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: RESTAURANTES EN CDMX (Parafraseado de la imagen "Restaurantes / bares en CDMX") */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block"><T>Circuitos Gastronómicos</T></span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6"><T>Su lugar reservado en la capital</T></h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                <T>Le aseguramos espacios privilegiados en los establecimientos más icónicos de la Ciudad de México. Disfrute de las transmisiones en vivo inmerso en una atmósfera festiva, combinada con la oferta culinaria distintiva de cada recinto.</T>
              </p>
              
              <div className="bg-muted/50 rounded-[2rem] p-8 mb-8 border border-border/50">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6"><T>Nuestra Selección en CDMX</T></h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {alliedVenues.map((venue, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <T>{venue}</T>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notas Legales / Disclaimers integrados elegantemente */}
              <div className="flex gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-[11px] text-muted-foreground leading-relaxed space-y-2">
                  <p><T>Nuestra labor garantiza su acceso y comodidad en un entorno deportivo ideal. Para otorgarle total libertad de elección, el consumo de alimentos y bebidas es independiente y no está incluido en la tarifa de reserva.</T></p>
                  <p className="italic"><T>* La disponibilidad está sujeta a la capacidad de cada sede. Aplican los términos de cada establecimiento. Sugerimos anticipar su solicitud.</T></p>
                </div>
              </div>
            </div>

            {/* Imagen ilustrativa funcional (Unsplash) con diseño premium */}
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.pexels.com/photos/34649301/pexels-photo-34649301.jpeg?auto=format&fit=crop" 
                alt="Ambiente de restaurante durante transmisión deportiva" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* FORMULARIO DE RESERVA (Reutilizando el componente Pricing de la BD) */}
      <section id="cotizar-mundial" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Planificación a Medida</span>
              <h2 className="text-4xl font-serif mt-4 text-foreground">Asegure su experiencia mundialista</h2>
              <p className="text-muted-foreground mt-4 font-light">
                <T>Permítanos diseñar su itinerario perfecto. Complete sus datos y un concierge especializado le presentará una propuesta detallada.</T>
              </p>
            </div>
            
            <div className="bg-white rounded-[3rem] shadow-xl border border-border/50 overflow-hidden">
              {/* Aquí se inyecta tu formulario que guarda en la tabla de cotizaciones */}
              <Pricing />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}