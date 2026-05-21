"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";

export default function PoliticaDeReembolsosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl animate-fade-in-up">
          <div className="text-center mb-16 border-b border-border pb-10">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary mb-4 block">
              <T>Documento Legal</T>
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground">
              <T>Política de Reembolsos y Cancelaciones</T>
            </h1>
          </div>

          <div className="text-sm md:text-base text-muted-foreground font-light leading-relaxed space-y-6">
            
            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>1. Alcance</T></h3>
            <p><T>La presente Política regula los supuestos en los que procede o no la devolución de pagos realizados por los Usuarios a través de los canales oficiales de MEXTRIPIA (sitio web, correo electrónico o plataformas digitales autorizadas).</T></p>
            <p><T>Aplica a todos los Servicios contratados, incluidos eventos, experiencias gastronómicas, tours, fan zones y reservaciones en restaurantes o bares asociados.</T></p>
            <p><T>Forma parte integral de los Términos y Condiciones Generales de Contratación de MEXTRIPIA.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>2. Condiciones generales de reembolso</T></h3>
            <p><strong><T>2.1.</T></strong> <T>El Usuario podrá solicitar un reembolso siempre que:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Se cumpla con el plazo mínimo de aviso indicado en las condiciones particulares del Servicio (ejemplo: 7 días naturales para eventos generales, 7 días para tours gastronómicos, 1 día para experiencias de consumo inmediato).</T></li>
              <li><T>El proveedor correspondiente confirme que el reembolso es procedente conforme a sus políticas internas.</T></li>
              <li><T>El pago haya sido acreditado correctamente a través de los sistemas autorizados por MEXTRIPIA.</T></li>
            </ul>
            <p><strong><T>2.2.</T></strong> <T>Ningún reembolso será procesado si la solicitud se presenta fuera de los plazos establecidos o en contravención a las políticas de los proveedores.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>3. Servicios no reembolsables</T></h3>
            <p><strong><T>3.1.</T></strong> <T>No procederá reembolso alguno en los siguientes supuestos:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Reservaciones en fechas de alta demanda (ejemplo: partidos de la Copa Mundial FIFA 2026, festividades nacionales o eventos masivos).</T></li>
              <li><T>Servicios que indiquen expresamente la cláusula “no reembolsable” en sus condiciones particulares.</T></li>
              <li><T>Pagos de anticipos, apartados o depósitos de garantía para asegurar disponibilidad.</T></li>
              <li><T>Cancelaciones motivadas por incumplimiento del Usuario (ej. impuntualidad, falta de documentos, incumplimiento de requisitos de acceso, conducta inapropiada, consumo excesivo de alcohol o sustancias).</T></li>
            </ul>
            <p><strong><T>3.2.</T></strong> <T>El Usuario reconoce y acepta que, en estos casos, la pérdida del monto pagado será total.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>4. Procedimiento para solicitar un reembolso</T></h3>
            <p><strong><T>4.1.</T></strong> <T>El Usuario deberá enviar un correo electrónico a atencion@mextripia.com, indicando:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Nombre completo del titular de la reservación.</T></li>
              <li><T>Número de reservación.</T></li>
              <li><T>Servicio contratado.</T></li>
              <li><T>Fecha prevista del Servicio.</T></li>
              <li><T>Motivo de la cancelación y solicitud de reembolso.</T></li>
            </ul>
            <p><strong><T>4.2.</T></strong> <T>MEXTRIPIA confirmará la recepción de la solicitud y gestionará ante el proveedor correspondiente la procedencia o improcedencia del reembolso.</T></p>
            <p><strong><T>4.3.</T></strong> <T>En caso de ser aprobado, se notificará al Usuario el monto a devolver y la fecha estimada de acreditación.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>5. Forma y tiempos de devolución</T></h3>
            <p><strong><T>5.1.</T></strong> <T>Los reembolsos se efectuarán, siempre que sea técnicamente posible, a través del mismo método de pago utilizado por el Usuario.</T></p>
            <p><strong><T>5.2.</T></strong> <T>En caso de imposibilidad técnica, el reembolso podrá realizarse mediante transferencia bancaria a una cuenta a nombre del titular original de la reservación.</T></p>
            <p><strong><T>5.3.</T></strong> <T>Los plazos de acreditación dependen de las instituciones financieras, pudiendo variar entre 5 y 20 días hábiles posteriores a la confirmación del reembolso.</T></p>
            <p><strong><T>5.4.</T></strong> <T>MEXTRIPIA no será responsable por demoras imputables a bancos, pasarelas de pago o terceros ajenos a su control.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>6. Reembolsos parciales</T></h3>
            <p><strong><T>6.1.</T></strong> <T>Cuando un Usuario haya utilizado parcialmente un Servicio contratado (ejemplo: asistencia a una parte del evento, consumo de algunos beneficios de un paquete), sólo podrá solicitar un reembolso parcial, si así lo autoriza el proveedor.</T></p>
            <p><strong><T>6.2.</T></strong> <T>En ningún caso procederá la devolución íntegra del monto pagado si parte del Servicio ya fue disfrutado por el Usuario.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>7. Cancelación por parte de MEXTRIPIA o proveedores</T></h3>
            <p><strong><T>7.1.</T></strong> <T>En caso de cancelación de un Servicio por causas imputables a MEXTRIPIA o a un proveedor, el Usuario podrá optar entre:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>La reprogramación del Servicio en otra fecha.</T></li>
              <li><T>La devolución íntegra del monto pagado.</T></li>
            </ul>
            <p><strong><T>7.2.</T></strong> <T>No procederá indemnización adicional por daños indirectos, pérdidas de oportunidad o lucro cesante.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>8. Casos de fuerza mayor o causas ajenas a MEXTRIPIA</T></h3>
            <p><strong><T>8.1.</T></strong> <T>No procederán reembolsos cuando la cancelación o modificación del Servicio se deba a:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Condiciones climáticas adversas.</T></li>
              <li><T>Medidas gubernamentales, sanitarias o de seguridad.</T></li>
              <li><T>Fallas técnicas o cortes de transmisión.</T></li>
              <li><T>Cualquier evento calificado como caso fortuito o fuerza mayor.</T></li>
            </ul>
            <p><strong><T>8.2.</T></strong> <T>En estos casos, MEXTRIPIA podrá ofrecer al Usuario alternativas razonables (reprogramación, sustitución por otro Servicio similar), sin que exista obligación de devolución del monto pagado.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>9. Contracargos y pagos no reconocidos</T></h3>
            <p><strong><T>9.1.</T></strong> <T>Si un Usuario inicia un contracargo con su banco o institución financiera, MEXTRIPIA se reserva el derecho de:</T></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Suspender la prestación del Servicio.</T></li>
              <li><T>Rechazar futuras contrataciones del Usuario.</T></li>
              <li><T>Reclamar judicial o extrajudicialmente los montos adeudados, incluyendo comisiones y gastos legales.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>10. Aceptación expresa</T></h3>
            <p><T>Al confirmar su reservación y efectuar el pago correspondiente, el Usuario declara haber leído, comprendido y aceptado íntegramente la presente Política de Reembolsos, así como los Términos y Condiciones Generales de Contratación de MEXTRIPIA.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>11. Contacto</T></h3>
            <p><T>Para cualquier consulta relacionada con esta política, el cliente podrá comunicarse al correo atencion@mextripia.com o acudir directamente al domicilio de MEXTRIPIA en Av. Río Consulado Cto Interior 516, Oficina 102, Colonia Tlatilco, Alcaldía Azcapotzalco, C.P. 02860, Ciudad de México.</T></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}