import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const galleryItems = [
  { src: '/i/WhatsApp Image 2026-06-02 at 01.58.52.jpeg', width: 'w-[190px] sm:w-[260px] md:w-[380px]', height: 'h-[350px] md:h-[520px]', yOffset: 'translate-y-0' },
  { src: '/i/WhatsApp Image 2026-06-02 at 01.58.59.jpeg', width: 'w-[160px] sm:w-[220px] md:w-[300px]', height: 'h-[300px] md:h-[420px]', yOffset: 'translate-y-12' },
  { src: '/i/WhatsApp Image 2026-06-02 at 01.59.10.jpeg', width: 'w-[200px] sm:w-[280px] md:w-[420px]', height: 'h-[380px] md:h-[550px]', yOffset: '-translate-y-8' },
  { src: '/i/WhatsApp Image 2026-06-02 at 01.59.20.jpeg', width: 'w-[170px] sm:w-[240px] md:w-[340px]', height: 'h-[320px] md:h-[480px]', yOffset: 'translate-y-6' },
  { src: '/i/WhatsApp Image 2026-06-02 at 01.59.22.jpeg', width: 'w-[210px] sm:w-[300px] md:w-[440px]', height: 'h-[400px] md:h-[580px]', yOffset: '-translate-y-12' },
  { src: '/i/WhatsApp Image 2026-06-02 at 01.59.23.jpeg', width: 'w-[180px] sm:w-[250px] md:w-[380px]', height: 'h-[360px] md:h-[500px]', yOffset: 'translate-y-4' },
];

// Duplicate items multiple times to ensure a seamless infinite scroll
const duplicatedItems = [...galleryItems, ...galleryItems, ...galleryItems, ...galleryItems];

export default function GallerySection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0c4a6e_0%,#0369a1_50%,#075985_100%)] py-24 md:py-32 z-30"
    >
      {/* Background Ornaments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#e0f2fe]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#38bdf8]/10 blur-[100px]" />

        {/* Subtle grid pattern for premium modern feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{ backgroundImage: `linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e0f2fe]/30 bg-[#075985]/50 px-5 py-2 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#e0f2fe]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#e0f2fe]">
              Without Words
            </span>
          </div>

          <h2 className="font-serif text-5xl font-normal tracking-wide text-[#ffffff] md:text-7xl">
            Our <span className="italic text-[#e0f2fe]">Gallery</span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#e0f2fe]/60" />
            <Heart size={14} className="text-[#e0f2fe] fill-[#e0f2fe]/20" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#e0f2fe]/60" />
          </div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Gallery */}
      <div className="relative mt-20 flex w-full overflow-hidden py-10">

        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 z-20 h-full w-[10%] bg-gradient-to-r from-[#0c4a6e] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-[10%] bg-gradient-to-l from-[#0c4a6e] to-transparent pointer-events-none" />

        {mounted && (
          <motion.div
            className="flex w-max items-center gap-4 sm:gap-6 md:gap-12 px-2 sm:px-4 md:px-6"
            // Start at -50% and go to 0% to move visuals to the RIGHT continuously
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 45, // Adjust speed
              repeat: Infinity,
            }}
          >
            {duplicatedItems.map((item, index) => (
              <motion.div
                key={index}
                className={`group relative shrink-0 overflow-hidden rounded-[2.5rem] border border-[#e0f2fe]/20 bg-[#0c4a6e] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${item.width} ${item.height} ${item.yOffset}`}
                whileHover={{ scale: 1.05, y: -10, zIndex: 50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Premium Golden Inner Frame */}
                <div className="absolute inset-4 z-20 rounded-[1.8rem] border border-[#e0f2fe]/30 transition-all duration-500 group-hover:border-[#e0f2fe]/80 group-hover:scale-[0.98]" />

                {/* Image Element */}
                <img
                  src={item.src}
                  alt="Gallery Moment"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Romantic Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c4a6e]/80 via-[#0c4a6e]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-y-0 left-[-50%] z-20 w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  animate={{ left: ['-50%', '150%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: Math.random() * 2 + 1, ease: 'easeInOut' }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="relative z-10 mx-auto mt-24 max-w-3xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-xl italic text-[#ffffff]/60 md:text-2xl"
        >
          Some moments are too beautiful for words.
        </motion.p>
      </div>
    </section>
  );
}
