'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Playables from '@/components/Playables';
import Showreel from '@/components/Showreel';
import Services from '@/components/Services';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Playables />
        <Showreel />
        <Portfolio />
        <Services />
        <About />
        <Footer />
      </main>
    </>
  );
}
