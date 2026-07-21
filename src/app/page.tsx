import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
    </main>
  );
}
<main className="min-h-screen bg-zinc-950">
  <Navbar />
  <Hero />
  <Features />
</main>