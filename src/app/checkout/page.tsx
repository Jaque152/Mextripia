"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { CheckCircle, Loader2, User, FileText, ChevronLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const [contactInfo, setContactInfo] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [billingInfo, setBillingInfo] = useState({ rfc: "", businessName: "", address: "" });
  const [needsInvoice, setNeedsInvoice] = useState(false);

  const formatPrice = (price: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { data: customer, error: custError } = await supabase
        .from('customers')
        .upsert({ first_name: contactInfo.firstName, last_name: contactInfo.lastName, email: contactInfo.email, phone: contactInfo.phone }, { onConflict: 'email' })
        .select().single();

      if (custError) throw custError;

      const { data: booking, error: bookError } = await supabase
        .from('bookings')
        .insert({
          customer_id: customer.id,
          total_amount: cart.total,
          payment_status: 'paid',
          rfc: needsInvoice ? billingInfo.rfc : null,
          razon_social: needsInvoice ? billingInfo.businessName : null,
          direccion_facturacion: needsInvoice ? billingInfo.address : null
        })
        .select().single();

      if (bookError) throw bookError;

      for (const item of cart.items) {
        await supabase.from('booking_items').insert({
          booking_id: booking.id,
          package_id: item.packageId,
          scheduled_date: item.date,
          pax_qty: item.people,
          unit_price: item.pricePerPerson
        });
      }

      const visualCode = `RES-${booking.id.slice(0, 8).toUpperCase()}`;
      setConfirmationCode(visualCode);
      
      // Llamada al API de correo (opcional, igual que tenías)
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'PURCHASE',
          email: contactInfo.email,
          customerName: contactInfo.firstName,
          resCode: visualCode,
          items: cart.items.map(i => ({
            experience_title: i.experience.title,
            travel_date: i.date,
            pax_qty: i.people,
            package_name: i.levelName,
            subtotal: formatPrice(i.totalPrice)
          })),
          total: formatPrice(cart.total)
        }),
      });

      setShowSuccess(true);
      clearCart();
    } catch (error) {
      console.error(error);
      alert("Error al procesar reserva.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = contactInfo.firstName && contactInfo.email && contactInfo.phone;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Header />
        <main className="flex-1 pt-32 flex items-center justify-center px-4">
          <Card className="max-w-lg w-full text-center p-10 shadow-2xl">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold mb-3">¡Reservación Confirmada!</h1>
            <p className="mb-8">Código: <span className="font-mono font-bold">{confirmationCode}</span></p>
            <Button asChild className="w-full bg-orange-400 rounded-full"><Link href="/">Volver al Inicio</Link></Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2"><User className="text-orange-600"/> Contacto</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input value={contactInfo.firstName} onChange={(e)=>setContactInfo({...contactInfo, firstName:e.target.value})} placeholder="Nombre *" required />
                  <Input value={contactInfo.lastName} onChange={(e)=>setContactInfo({...contactInfo, lastName:e.target.value})} placeholder="Apellidos" />
                  <Input type="email" value={contactInfo.email} onChange={(e)=>setContactInfo({...contactInfo, email:e.target.value})} placeholder="Email *" required />
                  <Input type="tel" value={contactInfo.phone} onChange={(e)=>setContactInfo({...contactInfo, phone:e.target.value})} placeholder="Teléfono *" required />
                </div>
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-serif font-semibold mb-6 flex items-center gap-2"><FileText className="text-orange-600"/> Facturación</h2>
                <label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={needsInvoice} onChange={(e)=>setNeedsInvoice(e.target.checked)} /> Requiero factura</label>
                {needsInvoice && <div className="grid sm:grid-cols-2 gap-4"><Input placeholder="RFC" onChange={(e)=>setBillingInfo({...billingInfo, rfc:e.target.value})} /><Input placeholder="Razón Social" onChange={(e)=>setBillingInfo({...billingInfo, businessName:e.target.value})} /></div>}
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-28">
                <h2 className="text-xl font-serif font-semibold mb-6">Resumen</h2>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold text-orange-700"><span>Total</span><span>{formatPrice(cart.total)}</span></div>
                  <Button type="submit" disabled={!isFormValid || isProcessing} className="w-full mt-6 bg-orange-400 h-12 rounded-full">{isProcessing ? <Loader2 className="animate-spin" /> : "Confirmar Reserva"}</Button>
                </div>
              </Card>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}