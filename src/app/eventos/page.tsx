import { Container } from '@/components/Container';
import Image from 'next/image';

export default function EventsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <header className="mb-16 text-center">
            <h1 className="text-5xl font-serif text-gray-900 mb-6">Eventos Especiales</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Hacemos que tus momentos más importantes brillen con luz propia. 
              Personalizamos nuestras velas para bodas, bautizos, comuniones y eventos corporativos.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
                alt="Velas para Eventos"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif text-gray-900">Personalización Total</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Desde el aroma hasta el etiquetado y el packaging. Trabajamos contigo para que el detalle de tu evento sea inolvidable.
                </p>
              </div>
              <ul className="space-y-4">
                {['Bodas y Aniversarios', 'Bautizos y Comuniones', 'Eventos de Empresa', 'Regalos Personalizados'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg text-gray-700">
                    <span className="w-2 h-2 bg-zinc-900 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <a 
                  href="mailto:hola@velarte.com" 
                  className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  Solicitar Presupuesto
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
