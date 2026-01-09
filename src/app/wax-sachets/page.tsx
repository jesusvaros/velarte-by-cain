import { Container } from '@/components/Container';

export default async function WaxSachetsPage() {
  return (
    <div className="py-16">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">Wax Sachets</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ambientadores sólidos naturales para armarios y espacios pequeños.
          </p>
        </header>

        <div className="text-center py-20 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
          <p className="text-xl text-zinc-600 font-medium italic">&ldquo;Estamos trabajando en ello para sorprenderos pronto&rdquo;</p>
        </div>
      </Container>
    </div>
  );
}
