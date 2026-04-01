import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
//const DEMO_RECIPIENT_EMAIL = 'zenithmexico26@gmail.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, customerName, email, destination, budget, startDate, endDate, travelers, message } = body; 

    let subject = "";
    let htmlContent = "";
    const primaryColor = '#c2410c'; 

    if (type === 'QUOTE') {
      subject = `[Solicitud Recibida] Gracias por tu mensaje - Zenith México`;

      htmlContent = `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, ${primaryColor} 100%); padding: 15px; text-align: center; border-radius: 10px 10px 0 0; color: #fff; font-weight: bold;">
            Zenith México
          </div>
          <div style="padding: 30px; border: 1px solid #eee; border-top: 0; border-radius: 0 0 10px 10px;">
            <h2 style="margin:0 0 15px;">Recibimos tu solicitud de cotización</h2>
            <p>Hola, <strong>${customerName}</strong>,</p>
            <p style="color: #666; margin-bottom: 25px;">Gracias por confiar en nosotros para planear tu viaje a <strong>${destination}</strong>. Un asesor experto se pondrá en contacto contigo en menos de 24 horas.</p>
                        
            <div style="background: #fdf2f2; padding: 15px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #fee2e2;">
              <p style="margin: 0; color: ${primaryColor}; font-weight: bold;">TU MENSAJE</p>
              <p style="margin: 10px 0 0; font-size: 14px; font-style: italic; color: #555;">${message}</p>
            </div>
            
            <p style="color: #666; margin-bottom: 25px;">Mientras tanto, puedes seguir explorando nuestras experiencias.</p>
            <a href="https://zenithmex.com/#experiencias" style="display: block; width: 100%; text-align: center; background: ${primaryColor}; color: #fff; padding: 15px; border-radius: 30px; text-decoration: none; font-weight: bold;">Ver más experiencias</a>
          </div>
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'Zenith México <cotizaciones@zenithmex.com>', 
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error completo de envío:", error);
    return NextResponse.json({ error: "Error interno de envío" }, { status: 500 });
  }
}