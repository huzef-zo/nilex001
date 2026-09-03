/**
 * HomePage — assembles all home page sections in scroll order.
 * The 3D scene is mounted at the top level (in page.tsx) and sits
 * behind the hero only.
 */
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import NewArrivals from "@/components/home/NewArrivals";
import EditorialSplit from "@/components/home/EditorialSplit";
import Testimonials from "@/components/home/Testimonials";
import BrandValues from "@/components/home/BrandValues";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <NewArrivals />
      <EditorialSplit />
      <Testimonials />
      <BrandValues />
    </main>
  );
}
