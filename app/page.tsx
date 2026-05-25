'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });
const MatrixRain    = dynamic(() => import('../components/MatrixRain'),    { ssr: false });
const CustomCursor  = dynamic(() => import('../components/CustomCursor'),  { ssr: false });

import Navbar      from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import About       from '../components/About';
import Skills      from '../components/Skills';
import Experience  from '../components/Experience';
import Projects    from '../components/Projects';
import Research    from '../components/Research';
import Gallery     from '../components/Gallery';
import Contact     from '../components/Contact';

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState('hero');

  // FIXED: Dependency array is now CONSTANT (only [loaded])
  // We handle the internal logic inside the effect rather than returning early
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'research', 'contact'];
      let currentActive = 'hero';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = id;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]); 

  return (
    <main className="bg-[#010603] min-h-screen text-[#00ff88] overflow-x-hidden cursor-none">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #00ff88; }
      `}</style>
      
      <MatrixRain />
      <CustomCursor />
      
      {!loaded && (
        <LoadingScreen 
          onDone={() => {
            setLoaded(true);
            // This forces the browser to the top immediately after the loading screen fades
            setTimeout(() => window.scrollTo(0, 0), 50);
          }} 
        />
      )}

      {loaded && (
        <div className="animate-in fade-in duration-1000">
          <Navbar active={active} />
          <div id="hero"><HeroSection /></div>
          <div id="about"><About /></div>
          <div id="skills"><Skills /></div>
          <div id="experience"><Experience /></div>
          <div id="projects"><Projects /></div>
          <div id="research"><Research /></div>
          <div id="gallery"><Gallery /></div>
          <div id="contact"><Contact /></div>
        </div>
      )}
    </main>
  );
}