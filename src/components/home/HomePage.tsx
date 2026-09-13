/**
 * HomePage — assembles all home page sections in scroll order.
 * The 3D scene is mounted at the top level (in page.tsx) and sits
 * behind the hero only.
 */
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
    </main>
  );
}
