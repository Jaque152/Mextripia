"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { T } from "@/components/T";

export default function AvisoDePrivacidadPage() {
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
              <T>Aviso de Privacidad</T>
            </h1>
          </div>

          <div className="text-sm md:text-base text-muted-foreground font-light leading-relaxed space-y-6">
            
            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>A. Responsable de los datos personales</T></h3>
            <p><strong><T>A.1. Identidad del responsable.</T></strong> <T>El tratamiento de los datos personales recabados a través de mextripia.com, así como por otros medios electrónicos o físicos, corresponde a GREATDEN S.A. DE C.V. (en adelante, “MEXTRIPIA” o el “Responsable”).</T></p>
            <p><strong><T>A.2. Domicilio.</T></strong> <T>Av. Río Consulado Cto Interior 516, Oficina 102, Col. Tlatilco, Alcaldía Azcapotzalco, C.P. 02860, Ciudad de México.</T></p>
            <p><strong><T>A.3. Medios de contacto.</T></strong> <T>Para privacidad y datos personales: atencion@mextripia.com.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>B. Titulares de los datos</T></h3>
            <p><strong><T>B.1. Alcance subjetivo.</T></strong> <T>Aplica a toda persona física cuyos datos sean tratados por MEXTRIPIA.</T></p>
            <p><strong><T>B.2. Colectivos incluidos (enunciativo).</T></strong> <T>Clientes, prospectos, visitantes del sitio, aliados comerciales (contactos de empresas), proveedores y sus representantes, candidatos a empleo y asistentes a eventos/experiencias.</T></p>
            <p><strong><T>B.3. Obtención.</T></strong> <T>Cualquier persona que proporcione datos mediante formularios web, correo, mensajería, llamadas, contratos, tarjetas, QR, check-in en eventos o comunicación directa se considera Titular.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>C. Categorías de datos que podremos recabar</T></h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong><T>C.1. Identificación:</T></strong> <T>nombre completo, edad/fecha de nacimiento, nacionalidad, género, CURP/RFC (si procede), firma autógrafa/electrónica.</T></li>
              <li><strong><T>C.2. Contacto:</T></strong> <T>domicilio, correos, teléfonos (incl. WhatsApp laboral/personal).</T></li>
              <li><strong><T>C.3. Fiscales/Facturación:</T></strong> <T>razón social, RFC, domicilio fiscal, CFDI/uso del CFDI.</T></li>
              <li><strong><T>C.4. Preferencias y servicio:</T></strong> <T>idioma, número de acompañantes, restricciones alimenticias, accesibilidad, horarios preferidos, comentarios logísticos.</T></li>
              <li><strong><T>C.5. Relación proveedor/aliado:</T></strong> <T>datos de contacto de representantes, poderes/identificación para firma (cuando resulte necesario).</T></li>
              <li><strong><T>C.6. Candidatos:</T></strong> <T>CV, historial laboral/formativo, referencias, expectativa económica, disponibilidad.</T></li>
              <li><strong><T>C.7. Imagen y voz:</T></strong> <T>fotografías, audio y video captados en eventos y experiencias (ver finalidad secundaria).</T></li>
              <li><strong><T>C.8. Datos sensibles (casos excepcionales):</T></strong> <T>alergias, condiciones médicas relevantes o movilidad cuando sean indispensables para seguridad/adecuación del servicio. Se tratarán con consentimiento expreso y medidas reforzadas. No solicitamos datos de convicciones religiosas, ideología, orientación sexual ni información financiera completa de tarjetas.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>D. Finalidades del tratamiento</T></h3>
            <p><strong><T>D.1. Finalidades primarias (indispensables para la relación):</T></strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Gestionar solicitudes y reservaciones (altas, cambios, confirmaciones).</T></li>
              <li><T>Contratación y operación de servicios (experiencias, tours, fan zones, reservaciones en restaurantes/bares, logística).</T></li>
              <li><T>Cobranza y pagos vía pasarelas seguras; facturación y comprobación contable.</T></li>
              <li><T>Atención al cliente (incidencias, reprogramaciones, cancelaciones y reembolsos conforme a políticas).</T></li>
              <li><T>Cumplimientos legales (fiscales, comerciales, seguridad/sanidad, respuesta a autoridades).</T></li>
              <li><T>Gestión de proveedores/aliados (alta, verificación, administración contractual).</T></li>
              <li><T>Procesos de selección (para candidatos).</T></li>
            </ul>
            <p className="mt-4"><strong><T>D.2. Finalidades secundarias (opcionales):</T></strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Comunicaciones comerciales (promociones, newsletters, encuestas, invitaciones).</T></li>
              <li><T>Análisis y métricas de uso del sitio, preferencias y tendencias para mejorar servicios.</T></li>
              <li><T>Uso de imagen/voz captada en eventos para fines promocionales de MEXTRIPIA (sitio, redes, materiales).</T></li>
              <li><T>Perfilamiento básico (p. ej., segmentos por destino preferido o franja horaria) sin decisiones automatizadas que produzcan efectos legales.</T></li>
            </ul>
            <p><T>Puedes optar por no recibir comunicaciones promocionales o negar las finalidades secundarias escribiendo a atencion@mextripia.com. La negativa no afecta la prestación de los servicios primarios.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>E. Base de licitud</T></h3>
            <p><T>Tratamos datos conforme a la LFPDPPP bajo: (i) consentimiento; (ii) ejecución de contrato/relación jurídica; (iii) cumplimiento legal; (iv) interés legítimo (p. ej. seguridad del sitio, métricas de mejora, prevención de fraude), sin menoscabar tus derechos. Los datos sensibles se tratan únicamente con consentimiento expreso y cuando sean estrictamente necesarios.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>F. Transferencias y destinatarios</T></h3>
            <p><strong><T>F.1. Nacionales/internacionales (cuando apliquen):</T></strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Proveedores de servicios necesarios para operar (pasarelas de pago, hosting, CRM, email, mensajería, verificación de identidad, venues, restaurantes/bares, guías, transportistas, fotógrafos, productoras).</T></li>
              <li><T>Aliados/comerciales para co-ejecución del servicio contratado o administración.</T></li>
              <li><T>Autoridades administrativas o judiciales, cuando exista requerimiento u obligación.</T></li>
              <li><T>Auditores/asesores (legales, contables, fiscales) bajo deber de confidencialidad.</T></li>
            </ul>
            <p><strong><T>F.2. Encargados.</T></strong> <T>Algunos terceros actúan como encargados (procesan por cuenta del Responsable) bajo contratos con cláusulas de confidencialidad y seguridad.</T></p>
            <p><strong><T>F.3. No comercialización.</T></strong> <T>No vendemos tus datos. Fuera de estos supuestos, cualquier transferencia requerirá tu consentimiento expreso.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>G. Medidas de seguridad</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>G.1.</T></strong> <T>Controles administrativos, técnicos y físicos proporcionales al riesgo: control de accesos, principio de mínima necesidad, registros, entrenamiento, acuerdos de confidencialidad.</T></li>
              <li><strong><T>G.2.</T></strong> <T>Seguridad tecnológica: cifrado TLS/SSL, segmentación de redes, hash de contraseñas, registros de acceso, pasarelas certificadas (p. ej., PCI DSS), monitoreo antifraude.</T></li>
              <li><strong><T>G.3.</T></strong> <T>Gestión de incidentes: procedimiento interno de respuesta a brechas; notificación a titulares y autoridades cuando legalmente proceda.</T></li>
              <li><strong><T>G.4.</T></strong> <T>Aun con medidas reforzadas, ningún sistema es invulnerable; se limita la responsabilidad conforme a ley y T&C.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>H. Conservación (retención) de datos</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>H.1.</T></strong> <T>Conservamos datos solo el tiempo necesario para finalidades declaradas y plazos legales (fiscales, comerciales, prescripción).</T></li>
              <li><strong><T>H.2.</T></strong> <T>Cumplidas finalidades/plazos, procedemos a supresión, bloqueo o anonimización segura.</T></li>
              <li><strong><T>H.3.</T></strong> <T>Criterios: tipo de dato, riesgo, obligaciones regulatorias, defensa de derechos y necesidades operativas.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>I. Derechos ARCO, limitación de uso y revocación del consentimiento</T></h3>
            <p><strong><T>I.1. Ejercicio ARCO.</T></strong> <T>Envía solicitud a atencion@mextripia.com con: Nombre completo y copia de identificación; descripción de los derechos a ejercer (acceso/rectificación/cancelación/oposición); datos/periodo a localizar; medio para notificar respuesta.</T></p>
            <p><strong><T>I.2. Plazos.</T></strong> <T>Responderemos en máximo 20 días hábiles; de ser procedente, ejecutaremos en 15 días hábiles siguientes.</T></p>
            <p><strong><T>I.3. Prevención.</T></strong> <T>Si faltara información, te requeriremos en 5 días hábiles; tendrás 10 días hábiles para completar.</T></p>
            <p><strong><T>I.4. Limitación de uso/divulgación.</T></strong> <T>Puedes solicitar inscripción/actualización en nuestros listados de no contacto (opt-out marketing).</T></p>
            <p><strong><T>I.5. Revocación.</T></strong> <T>Puedes revocar tu consentimiento para finalidades no indispensables; en finalidades primarias, la revocación puede imposibilitar la prestación/continuidad del servicio.</T></p>
            <p><strong><T>I.6. Medios alternos.</T></strong> <T>También puedes ejercer derechos a través de representante legal con poderes suficientes.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>J. Menores y personas con capacidad limitada</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>J.1.</T></strong> <T>No recabamos intencionalmente datos de menores de 18 años sin consentimiento de madre/padre/tutor.</T></li>
              <li><strong><T>J.2.</T></strong> <T>Si detectamos registro sin autorización, procederemos a supresión.</T></li>
              <li><strong><T>J.3.</T></strong> <T>Para accesos a experiencias con restricción de edad (p. ej., alcohol), se podrá solicitar identificación.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>K. Cookies, web beacons y tecnologías similares</T></h3>
            <p><strong><T>K.1. Finalidad.</T></strong> <T>Usamos cookies y tecnologías afines para: (i) recordar sesión/preferencias (idioma, zona horaria), (ii) analítica de uso y desempeño del sitio, (iii) seguridad y prevención de fraude, (iv) eventualmente publicidad y retargeting.</T></p>
            <p><strong><T>K.2. Tipos.</T></strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><T>Esenciales: funcionamiento del sitio/checkout.</T></li>
              <li><T>De desempeño/analítica: métricas y mejoras (p. ej., páginas visitadas, tiempo de sesión).</T></li>
              <li><T>Funcionales: recordar opciones del usuario.</T></li>
              <li><T>Publicidad: mostrar anuncios relevantes (si se habilitan).</T></li>
            </ul>
            <p><strong><T>K.3. Gestión.</T></strong> <T>Puedes deshabilitarlas en tu navegador o configurar preferencias; desactivar cookies esenciales puede afectar el funcionamiento.</T></p>
            <p><strong><T>K.4. Señales “Do Not Track”.</T></strong> <T>Si tu navegador envía DNT, haremos esfuerzos razonables para respetar dicha preferencia conforme a nuestras capacidades técnicas.</T></p>
            <p><strong><T>K.5. Terceros.</T></strong> <T>Herramientas analíticas/ads de terceros (si se usan) operan con sus propias políticas; te sugerimos revisarlas.</T></p>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>L. Decisiones automatizadas y perfilamiento</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>L.1.</T></strong> <T>No adoptamos decisiones automatizadas que produzcan efectos legales significativos.</T></li>
              <li><strong><T>L.2.</T></strong> <T>Podemos realizar perfilamiento básico (segmentos por destino/horarios/frecuencia) para mejorar comunicaciones; puedes oponerte vía ARCO.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>M. Uso de imagen en eventos/experiencias</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>M.1.</T></strong> <T>En actividades organizadas por MEXTRIPIA podremos registrar foto/video/voz para documentación y promoción.</T></li>
              <li><strong><T>M.2.</T></strong> <T>Antes de la captura con fines promocionales procuraremos señalización o cláusula visible; podrás manifestar oposición razonable cuando sea viable sin afectar la operación/seguridad.</T></li>
              <li><strong><T>M.3.</T></strong> <T>Cuando se trate de menores, requerimos consentimiento del tutor.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>N. Transferencias internacionales y hosting</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>N.1.</T></strong> <T>Algunos proveedores tecnológicos pueden hospedar o procesar datos fuera de México bajo cláusulas contractuales y salvaguardas adecuadas.</T></li>
              <li><strong><T>N.2.</T></strong> <T>Adoptamos medidas para asegurar que dichos terceros mantengan estándares de seguridad y confidencialidad equivalentes.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>O. Quejas y medios de defensa</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>O.1.</T></strong> <T>Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir ante MEXTRIPIA (atencion@mextripia.com).</T></li>
              <li><strong><T>O.2.</T></strong> <T>También puedes presentar una queja ante el INAI conforme a los plazos y procedimientos legales.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>P. Modificaciones al Aviso</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>P.1.</T></strong> <T>Podremos modificar este Aviso por cambios legales, regulatorios, contractuales, tecnológicos u operativos.</T></li>
              <li><strong><T>P.2.</T></strong> <T>La versión vigente estará disponible en mextripia.com y entrará en vigor desde su publicación. Recomendamos revisarlo periódicamente.</T></li>
            </ul>

            <h3 className="text-2xl font-serif text-foreground mt-12 mb-4"><T>Q. Aceptación</T></h3>
            <ul className="list-none space-y-4">
              <li><strong><T>Q.1.</T></strong> <T>Al proporcionar datos, navegar en el sitio, enviar formularios, contratar o asistir a eventos/experiencias, declaras que leíste y aceptas este Aviso.</T></li>
              <li><strong><T>Q.2.</T></strong> <T>Para finalidades secundarias y/o datos sensibles, recabaremos tu consentimiento expreso.</T></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}