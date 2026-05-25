'use client';
import { motion } from 'framer-motion';
import { galleryImages } from '../lib/data';

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-28 px-4 md:px-8 max-w-[1200px] mx-auto overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      
      <div className="text-left mb-16">
        <span className="font-mono text-emerald-500 text-xs tracking-[0.3em]">// 06.ARCHIVE_DATA</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-2">OPERATIONAL_FEED</h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {galleryImages.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 0.98 }}
            className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 
              ${i % 5 === 0 ? 'md:col-span-2 lg:row-span-2' : 'md:col-span-1'}`}
          >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
            
            <img 
              src={src} 
              alt="Archive Asset" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
            />

            {/* Corner Bracket Decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Asset Tag */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] bg-black/50 backdrop-blur px-2 py-1 border border-emerald-500/30 text-emerald-500 rounded-md">
              0x{1000 + i}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}