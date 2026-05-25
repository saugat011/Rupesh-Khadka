'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });
const MatrixRain = dynamic(() => import('../components/MatrixRain'), { ssr: false });
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState('hero');

  // Ensure scroll is forced to top on mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-[#010603] min-h-screen text-[#00ff88] overflow-x-hidden cursor-none">
      <MatrixRain />
      <CustomCursor />
      
      {!loaded && (
        <LoadingScreen 
          onDone={() => {
            // Force scroll to top IMMEDIATELY before rendering content
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            setLoaded(true);
          }} 
        />
      )}

      {/* Opacity lock prevents the user from seeing the page jump while it renders */}
      <div 
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar active={active} />
        <section id="hero"><HeroSection /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="research"><Research /></section>
        <section id="gallery"><Gallery /></section>
        <section id="contact"><Contact /></section>
      </div>
    </main>
  );
}