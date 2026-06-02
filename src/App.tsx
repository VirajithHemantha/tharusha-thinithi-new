import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import GallerySection from './GallerySection';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel, MailOpen, Heart, Stars } from "lucide-react";
import { useInView } from 'react-intersection-observer';

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Tharusha & Thinithi
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const brideGroomImage = "/DSC00263_1.jpg.jpeg";
const secondaryImage = "/DSC05289_1.jpg.jpeg";
const backgroundMusic = "/wedding_song.mp3";
const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL?.trim() || "";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#ff0080", "#ff8c00", "#ffd700", "#00ffff", "#8a2be2", "#ffffff"];
    const petalCount = isMobile ? 15 : 25;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 30 - 15,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const targetDate = useMemo(() => new Date("March 12, 2027 09:00:00").getTime(), []);

  const getTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  })), []);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 bg-[#0ea5e9] flex flex-col items-center overflow-hidden z-20"
    >
      {/* Immersive Magical Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#0369a1] to-[#0ea5e9]" />
        
        {/* Layer 2: Animated Bokeh Lights */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full blur-[80px]"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#d4af37' : '#ffffff'
            }}
          />
        ))}

        {/* Layer 3: Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-7xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-4xl"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <motion.div 
               animate={{ rotate: 180 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-[#d4af37]" />
            </motion.div>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 className="font-alex text-7xl md:text-[10rem] text-white leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            Counting Down to <span className="text-shimmer">Forever</span>
          </h2>
          
          <div className="mt-8 flex flex-col items-center space-y-4">
            <p className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#d4af37]/80">Until March 12th • 2027</p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          </div>
        </motion.div>

        {/* New Creative Countdown Unit Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-5xl">
          {countdownItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative group"
            >
              {/* Floating Glow Overlay */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/30 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative h-full aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] border border-[#d4af37]/20 bg-white/5 backdrop-blur-2xl px-4 flex flex-col items-center justify-center overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-[#d4af37]/50 group-hover:bg-white/10">
                {/* Decorative Internal Border */}
                <div className="absolute inset-3 border border-[#d4af37]/10 rounded-[2rem] pointer-events-none" />
                
                {/* Number Section */}
                <div className="relative h-[80px] md:h-[120px] flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.value}
                      initial={{ y: 60, opacity: 0, scale: 0.5, rotateX: 90 }}
                      animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                      exit={{ y: -60, opacity: 0, scale: 0.5, rotateX: -90 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 20,
                        duration: 0.8
                      }}
                      className="absolute font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Label Section */}
                <motion.div 
                  className="mt-4 py-2 px-6 rounded-full border border-white/10 bg-black/30 backdrop-blur-md"
                  whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.15)", borderColor: "rgba(212, 175, 55, 0.4)" }}
                >
                  <p className="font-alex text-2xl md:text-3xl text-[#d4af37] leading-none">{item.label}</p>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute top-4 left-4 h-3 w-3 border-t border-l border-[#d4af37]/40" />
                <div className="absolute top-4 right-4 h-3 w-3 border-t border-r border-[#d4af37]/40" />
                <div className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-[#d4af37]/40" />
                <div className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[#d4af37]/40" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Quote or Line */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 1.5, duration: 1.5 }}
           className="mt-20 flex flex-col items-center space-y-8"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 opacity-30 invert pointer-events-none">
            <img src="/floral_corner_theme.png" alt="" className="w-full grayscale brightness-200" />
          </div>
          <p className="max-w-xl font-montserrat text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 leading-relaxed px-4">
            A journey of a thousand miles begins with a single step, <br className="hidden md:block"/> and we are counting every one until we say "I do".
          </p>
        </motion.div>
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-[#d4af37]">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-[#f7e7ce]/80 sm:text-2xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Preload critical assets */
const criticalAssets = ["/monogram_aa.png"];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fcfcf0]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#0284c7] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#0284c7] mt-1">Eagles Lagoon - Katunayaka</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fcfcf0]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#0284c7]/30" />
                <h3 className="font-playball text-3xl text-[#0284c7]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#0284c7]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#7dd3fc]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#0284c7] mb-4 border-b border-[#7dd3fc]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#0284c7] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#0284c7]/30" />
                <h3 className="font-playball text-3xl text-[#0284c7]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#0284c7]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#7dd3fc]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#0284c7] mb-4 border-b border-[#7dd3fc]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#0284c7] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#0284c7]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#0284c7]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#0284c7] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    place: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to.replace(/_/g, " ")); // Replace underscores with spaces for cleaner URLs
    }
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleViewInvitation = useCallback(() => {
    setShowVideo(true);
    
    // Unmute and play video
    const video = introVideoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      void video.play().catch((err) => {
        console.error("Video play error on View Invitation click:", err);
        // Fallback: try muted
        video.muted = true;
        void video.play().catch(() => {});
      });
    }
  }, []);

  const [musicAudible, setMusicAudible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioUnlockedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasStartedMusicRef.current) return false;

    try {
      // Mark as started immediately to prevent concurrent calls from multiple touch events
      hasStartedMusicRef.current = true; 
      audioUnlockedRef.current = true;
      
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(true);
      return true;
    } catch (err) {
      console.error("Audio play failed:", err);
      hasStartedMusicRef.current = false; // Reset on failure so we can try again
      audioUnlockedRef.current = false;
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    // Also unmute video if it's currently on screen and video is showing
    if (introVideoRef.current && showVideo) {
      introVideoRef.current.muted = false;
      void introVideoRef.current.play().catch(() => { });
    }

    if (audioUnlockedRef.current) return;
    if (!isOpened) return; // Don't auto-start background music unless we are in the main page

    // Start background music as soon as we have a gesture (any click/touch)
    const ok = await playMusic();
    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [isOpened, showVideo, playMusic, playMutedMusicFallback]);

  // Restart audio unlock attempt when invitation opens
  useEffect(() => {
    if (isOpened && !audioUnlockedRef.current) {
      void unlockAudioFromGesture();
    }
  }, [isOpened, unlockAudioFromGesture]);

  // Attempt unmuted autoplay for intro video when showVideo becomes true
  useEffect(() => {
    if (showVideo && !isOpened && introVideoRef.current) {
      const v = introVideoRef.current;
      v.muted = false;
      v.volume = 1;
      void v.play().catch(() => {
        // Autoplay with sound blocked? Fallback to muted autoplay
        v.muted = true;
        void v.play().catch(() => {});
      });

      // Safety timeout: If video doesn't end/play within 15 seconds, automatically enter main site
      const timer = setTimeout(() => {
        if (!isOpened) {
          console.log("Video safety timeout reached");
          setIsOpened(true);
          void playMusic();
        }
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [showVideo, isOpened, playMusic]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    if (isOpened) {
      preloadAssets();
    }
  }, [isOpened]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // With no-cors, we can't check response.ok, so we assume success if no promise rejection
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        place: rsvpForm.place.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", place: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  return (
    <main
      className={`min-h-screen w-full bg-white transition-all duration-1000 ${isOpened
        ? "relative"
        : "h-[100dvh] overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[200] bg-[#0ea5e9] flex items-center justify-center overflow-hidden"
          >
            {/* Elegant Cover Page (only visible when !showVideo) */}
            {!showVideo && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#fdfaf5]">
                {/* Elegant Background Patterns */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Soft Radial Cream Gradients */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,250,245,1)_0%,rgba(242,235,220,1)_100%)]" />
                  {/* Paper Texture */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                  
                  {/* Delicate Gold Geometric Frame (Inner border) */}
                  <div className="absolute inset-4 md:inset-8 border border-[#d4af37]/25 rounded-lg pointer-events-none" />
                  <div className="absolute inset-6 md:inset-10 border border-[#d4af37]/10 rounded-lg pointer-events-none" />

                  {/* Decorative Corner Ornaments */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#d4af37]/45 pointer-events-none" />
                  <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#d4af37]/45 pointer-events-none" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#d4af37]/45 pointer-events-none" />
                  <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#d4af37]/45 pointer-events-none" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">
                  {/* Monogram Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-white/50 backdrop-blur-md relative shadow-lg mb-10"
                  >
                    <div className="absolute inset-1 border border-[#d4af37]/10 rounded-full animate-spin-slow" />
                    <span className="font-cinzel text-3xl md:text-4xl text-[#d4af37] font-bold tracking-tighter">T&T</span>
                  </motion.div>

                  {/* Invitation Subtext */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-6"
                  >
                    <span className="font-cinzel text-[#d4af37] text-[10px] md:text-xs tracking-[0.45em] uppercase font-bold">
                      THE WEDDING INVITATION OF
                    </span>
                    <div className="mt-3 h-px w-20 mx-auto bg-[#d4af37]/30" />
                  </motion.div>

                  {/* Names */}
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="font-alex text-5xl sm:text-6xl md:text-7xl text-slate-800 leading-tight drop-shadow-sm mb-4"
                  >
                    Tharusha & Thinithi
                  </motion.h1>

                  {/* Date & Location Brief */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="font-cinzel text-slate-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12"
                  >
                    12 MARCH 2027 • EAGLES LAGOON
                  </motion.p>

                  {/* View Invitation Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    <button
                      onClick={handleViewInvitation}
                      className="group relative px-10 py-5 bg-white border border-[#d4af37]/45 text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all shadow-xl hover:bg-[#d4af37] hover:text-white active:scale-[0.98] duration-500 cursor-pointer rounded-sm"
                    >
                      {/* Subtle Inner Border */}
                      <div className="absolute inset-1 border border-[#d4af37]/15 group-hover:border-white/20 pointer-events-none transition-colors" />
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        View Invitation
                        <Stars className="w-3.5 h-3.5 animate-pulse" />
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Video Player Loader Overlay */}
            {showVideo && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0ea5e9]">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10 flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 border-2 border-sky-200/30 border-t-sky-200 rounded-full animate-spin shadow-sm" />
                  <p className="font-cinzel text-sky-200 text-xs md:text-sm tracking-[0.4em] uppercase animate-pulse drop-shadow-md">
                    Playing Video...
                  </p>
                </motion.div>
              </div>
            )}
            
            <video
              ref={introVideoRef}
              preload="auto"
              playsInline
              webkit-playsinline="true"
              onEnded={() => {
                setIsOpened(true);
                void playMusic();
              }}
              onError={() => {
                console.error("Video failed to load");
                setIsOpened(true);
              }}
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${
                showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <source src="/intro_video_new.mp4" type="video/mp4" />
            </video>

            {/* Skip Button (only visible when showVideo is true) */}
            {showVideo && (
              <button
                onClick={() => {
                  setIsOpened(true);
                  void playMusic();
                }}
                className="absolute top-6 right-6 z-30 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-white hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Skip Intro
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setIsOpened(false);
                setShowVideo(false);
                const audio = audioRef.current;
                if (audio) {
                  audio.pause();
                  hasStartedMusicRef.current = false;
                  setMusicAudible(false);
                }
              }}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section className="relative z-10 flex min-h-[95dvh] w-full items-center justify-center overflow-hidden bg-[#0ea5e9] px-4 py-12 sm:px-8 md:min-h-[100dvh]">
              {/* Immersive Atmospheric Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Deep Green Gradient Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1]" />
                
                {/* Subtle Video Background if you want it (commented out by default or use a specific one) */}
                {/* <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 contrast-125 grayscale">
                  <source src="/intro_video_new.mp4" type="video/mp4" />
                </video> */}

                {/* Animated Light Leaks */}
                <motion.div 
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    x: [-100, 100, -100],
                    y: [-50, 50, -50]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/4 -left-1/4 w-full h-full bg-[#d4af37]/5 blur-[120px] rounded-full"
                />
                
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-overlay" />

                {/* Large Background Monogram */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.03, scale: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center select-none"
                >
                  <span className="font-cinzel text-[40rem] font-bold text-white tracking-tighter">UA</span>
                </motion.div>

                {/* Floating Heart Accents */}
                <motion.div
                  animate={{ y: [-20, 20, -20], rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-[8%] text-[#d4af37]/20"
                >
                  <Heart size={80} fill="currentColor" strokeWidth={1} />
                </motion.div>
                <motion.div
                  animate={{ y: [20, -20, 20], rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-20 left-[8%] text-[#d4af37]/20"
                >
                  <Heart size={100} fill="currentColor" strokeWidth={1} />
                </motion.div>
              </div>

              <div className="relative z-20 w-full max-w-7xl">
                <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
                  
                  {/* Left Side: Tharusha */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-4"
                  >
                    <span className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#d4af37]/60">The Groom</span>
                    <h2 className="font-alex text-6xl md:text-7xl lg:text-[9rem] text-white leading-none drop-shadow-2xl">Tharusha</h2>
                    <p className="font-cinzel text-[9px] md:text-[10px] text-white/40 tracking-[0.4em] uppercase max-w-[200px]">Tharusha Sirimanna</p>
                  </motion.div>

                  {/* Center: Symbol & Divider */}
                  <div className="flex lg:flex-col items-center justify-center gap-6 py-8">
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                      className="w-16 h-16 md:w-20 md:h-20 border border-[#d4af37]/30 flex items-center justify-center rounded-full backdrop-blur-md relative"
                    >
                      <div className="absolute inset-1 border border-[#d4af37]/10 rounded-full animate-spin-slow" />
                      <span className="font-serif text-3xl md:text-5xl text-[#d4af37] italic">&amp;</span>
                    </motion.div>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 120 }}
                      transition={{ duration: 1, delay: 1 }}
                      className="hidden lg:block w-[1px] bg-gradient-to-b from-[#d4af37]/0 via-[#d4af37]/40 to-[#d4af37]/0"
                    />
                  </div>

                  {/* Right Side: Thinithi */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
                  >
                    <span className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#d4af37]/60">The Bride</span>
                    <h2 className="font-alex text-6xl md:text-7xl lg:text-[9rem] text-white leading-none drop-shadow-2xl">Thinithi</h2>
                    <p className="font-cinzel text-[9px] md:text-[10px] text-white/40 tracking-[0.4em] uppercase max-w-[200px]">Thinithi Peiris</p>
                  </motion.div>
                </div>

                {/* Bottom Details Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="mt-16 md:mt-24 flex flex-col items-center space-y-8"
                >
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
                  
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    <div className="text-center group">
                      <p className="font-montserrat text-[9px] font-bold text-[#d4af37]/60 uppercase tracking-[0.3em] mb-2 group-hover:text-[#d4af37] transition-colors">When</p>
                      <p className="font-cinzel text-sm md:text-lg text-white font-medium tracking-widest uppercase">MARCH 12 | 2027</p>
                    </div>
                    <div className="text-center group">
                      <p className="font-montserrat text-[9px] font-bold text-[#d4af37]/60 uppercase tracking-[0.3em] mb-2 group-hover:text-[#d4af37] transition-colors">Poru Ceremony</p>
                      <p className="font-cinzel text-sm md:text-lg text-white font-medium tracking-widest uppercase">08.45 AM</p>
                    </div>
                    <div className="text-center group">
                      <p className="font-montserrat text-[9px] font-bold text-[#d4af37]/60 uppercase tracking-[0.3em] mb-2 group-hover:text-[#d4af37] transition-colors">Time</p>
                      <p className="font-cinzel text-sm md:text-lg text-white font-medium tracking-widest uppercase">9.00 AM - 4.00 PM</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/20 bg-white/5 px-6 py-2 backdrop-blur-md">
                      <Heart className="h-3 w-3 text-[#d4af37] fill-[#d4af37]" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">Save The Date</span>
                      <Heart className="h-3 w-3 text-[#d4af37] fill-[#d4af37]" />
                    </div>
                    
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="pt-8"
                    >
                      <ChevronDown className="h-6 w-6 text-[#d4af37]/40" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative Borders */}
              <div className="absolute top-8 left-8 bottom-8 right-8 border border-[#d4af37]/10 pointer-events-none hidden md:block" />
              <div className="absolute top-12 left-12 bottom-12 right-12 border border-[#d4af37]/5 pointer-events-none hidden md:block" />
            </section>

            <section className="relative py-24 md:py-36 w-full flex flex-col items-center overflow-hidden z-10 border-b-[0.5px] border-[#d4af37]/30 bg-white">
              <div className="absolute inset-0 opacity-[0.5] bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] pointer-events-none" />

              {/* Cute heart accents for 'Cute' feel */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 text-pink-300 opacity-40"
              >
                <Heart size={30} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 text-pink-300 opacity-40"
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>

              <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16"
                >
                  <p className="tracking-[0.4em] md:tracking-[0.7em] text-[#d4af37] text-[9px] md:text-[12px] uppercase font-montserrat font-bold drop-shadow-sm">
                    TOGETHER WE REQUEST THE HONOUR OF YOUR PRESENCE
                  </p>
                  <p className="text-slate-500 font-serif text-[15px] md:text-[22px] italic tracking-wide mt-6 mb-2 uppercase">
                    TO CELEBRATE THE WEDDING OF THEIR CHILDREN
                  </p>
                  <div className="pt-4 pb-2 w-full flex justify-center">
                    <span className="text-[#0ea5e9] font-alex text-[2.8rem] md:text-6xl block my-2 drop-shadow-sm leading-tight text-center">
                      {guestName}
                    </span>
                  </div>
                  <div className="h-[0.5px] w-24 bg-[#d4af37]/50 mt-6" />
                </motion.div>

                <div className="relative w-full flex flex-col items-center justify-center mt-4 mb-16">
                  {/* Minimalist Names Centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex flex-col items-center text-center space-y-8 md:space-y-12 z-20 w-full"
                  >
                    <div className="w-full flex justify-center overflow-hidden">
                      <h3 className="text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[11rem] font-alex text-gold-gradient leading-none drop-shadow-sm px-2 pb-2">
                        Tharusha
                      </h3>
                    </div>

                    <div className="flex items-center gap-6 w-full justify-center px-4">
                      <div className="h-[0.5px] w-12 md:w-24 bg-[#d4af37]/40" />
                      <span className="font-serif text-3xl md:text-7xl text-slate-400 italic font-light">&amp;</span>
                      <div className="h-[0.5px] w-12 md:w-24 bg-[#d4af37]/40" />
                    </div>

                    <div className="w-full flex justify-center overflow-hidden">
                      <h3 className="text-[4.5rem] sm:text-7xl md:text-[9rem] lg:text-[11rem] font-alex text-gold-gradient leading-none drop-shadow-sm px-2 pt-2">
                        Thinithi
                      </h3>
                    </div>

                    <div className="pt-8 md:pt-12 w-full space-y-4">
                      <p className="font-montserrat text-[9px] md:text-[13px] tracking-[0.3em] text-slate-600 uppercase font-bold text-center leading-relaxed max-w-2xl mx-auto">
                        Loving Daughter of <br className="md:hidden" /> Mr. Peiris & Mrs. Jayarathne
                      </p>
                      <div className="h-px w-8 bg-[#d4af37]/20 mx-auto" />
                      <p className="font-montserrat text-[9px] md:text-[13px] tracking-[0.3em] text-slate-600 uppercase font-bold text-center leading-relaxed max-w-2xl mx-auto">
                        Loving Son of <br className="md:hidden" /> Mr. Thissa Sirimanna & Mrs. Sirimanna
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>



            <CountdownTimer />

            <GallerySection />

            <section className="relative py-24 md:py-36 bg-white overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-[1px] bg-[#0284c7]" />
                        <span className="text-[#C9A227]">✦</span>
                        <span className="text-[#0284c7] font-bold uppercase tracking-[0.4em] text-[10px]">
                          T H E | V E N U E
                        </span>
                      </div>
                      <h2 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#0284c7] leading-tight tracking-widest font-bold uppercase">
                        Eagles Lagoon
                      </h2>
                      <p className="font-playball text-3xl md:text-5xl text-[#0284c7] italic mt-2">
                        - Katunayaka
                      </p>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#7dd3fc]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#0284c7] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#0284c7] font-cinzel leading-relaxed tracking-wide uppercase">
                          Eagles Lagoon - Katunayaka
                        </p>
                      </div>
                      <p className="text-[#0284c7]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        (Poru Ceremony at 08.45 AM) FRIDAY, 12 MARCH 2027. From 9.00 AM to 4.00 PM.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open("https://share.google/qo9RB7hbJSVbUb5uv", "_blank")
                        }
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#0284c7] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#0369a1]"
                      >
                        <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Get Directions
                      </button>

                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-[3/4] max-w-[450px] mx-auto bg-white p-3 shadow-[0_40px_80px_-20px_rgba(135,147,122,0.2)] border border-[#7dd3fc]/50"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#0284c7]/30 pointer-events-none z-20" />
                    <div className="w-full h-full overflow-hidden bg-white relative">
                      <iframe
                        src="https://maps.google.com/maps?q=Eagles%20Lagoon%20Katunayaka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.8] contrast-110 sepia-[0.3] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 bg-white flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-white/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[0.5px] border-[#d4af37]/40 flex flex-col items-center pt-4 pb-12 px-6 md:px-10"
                  >
                    {/* Premium inner frame */}
                    <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#d4af37]/20 pointer-events-none" />

                    <div className="w-full flex flex-col items-center mt-6 relative z-10 px-2 md:px-6">
                      <p className="font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] text-slate-500 uppercase font-medium mb-2 text-center leading-relaxed">
                        RSVP - Tharusha 0774085454 | Thinithi 0742195454
                      </p>

                      <div className="flex items-center justify-center gap-4 w-full mb-8">
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                        <h3 className="font-alex text-5xl md:text-7xl text-gold-gradient whitespace-nowrap leading-[0.8] drop-shadow-sm px-2">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                      </div>

                      <form className="w-full space-y-8 text-left max-w-sm mt-4" onSubmit={handleRsvpSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="M.................................................."
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>

                        <div className="relative group pt-4">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute top-0 left-0 transition-colors group-focus-within:text-[#d4af37]">Area / City</label>
                          <input
                            type="text"
                            placeholder="Where are you coming from?"
                            value={rsvpForm.place}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, place: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic mt-4"
                            required
                          />
                        </div>

                        <div className="space-y-5 pt-6">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Will you attend?
                          </label>

                          <div className="flex flex-col gap-3 font-serif italic text-lg md:text-xl text-slate-700">
                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "yes" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "yes" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "yes"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "yes" })); }} />
                              <span>Delightfully accepts</span>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "no" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "no" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "no"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "no" })); }} />
                              <span>Regretfully declines</span>
                            </label>
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold tracking-widest uppercase mt-4 ${rsvpStatus === "success" ? "text-emerald-700" : "text-red-500"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "Thank you! RSVP sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}

                        <div className="pt-8">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="w-full border-[0.5px] border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-white py-4 rounded-sm font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] uppercase disabled:opacity-50"
                          >
                            {rsvpStatus === "sending" ? "SENDING..." : "CONFIRM ATTENDANCE"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            <div className="relative bg-[#0ea5e9]/5">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-32 md:py-48 flex flex-col items-center overflow-hidden">
                {/* Section Background Accents */}
                <div className="absolute inset-0 bg-[#0ea5e9]/5 pointer-events-none" />
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full"
                />

                <div className="container mx-auto px-6 max-w-5xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-8">
                       <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
                       <motion.div 
                         animate={{ scale: [1, 1.2, 1] }}
                         transition={{ duration: 2.5, repeat: Infinity }}
                       >
                         <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/20" />
                       </motion.div>
                       <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
                    </div>

                    <h2 className="font-alex text-7xl md:text-[9.5rem] text-[#0ea5e9] leading-none mb-8">
                      Best Wishes
                    </h2>
                    
                    <p className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-slate-500 max-w-xl mx-auto mb-20 leading-loose">
                      Your presence is our greatest gift, but your words are our most cherished treasure.
                    </p>

                    {/* Vellum Paper Style Form */}
                    <div className="w-full max-w-3xl mx-auto relative group">
                      {/* Decorative Background Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      
                      <div className="relative bg-white/60 backdrop-blur-xl border border-[#d4af37]/25 px-8 py-16 md:px-20 md:py-24 shadow-[0_40px_100px_-20px_rgba(6,78,59,0.12)] overflow-hidden">
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                        
                        {/* Internal Framing */}
                        <div className="absolute inset-4 border border-[#d4af37]/10 pointer-events-none" />
                        <div className="absolute top-8 left-8 bottom-8 right-8 border border-[#d4af37]/5 pointer-events-none" />

                        <form className="space-y-16 text-left relative z-10" onSubmit={handleWishSubmit}>
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                          >
                            <label className="block font-montserrat text-[9px] font-bold uppercase tracking-[0.4em] text-[#d4af37] mb-6">Sent By</label>
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={wishForm.name}
                              onChange={(e) => {
                                setWishStatus("idle");
                                setWishForm((prev) => ({ ...prev, name: e.target.value }));
                              }}
                              className="w-full bg-transparent border-b-[0.5px] border-[#0ea5e9]/20 py-4 text-[#0ea5e9] font-cinzel text-xl tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all"
                              required
                            />
                            <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#d4af37] transition-all duration-700 group-focus-within:w-full" />
                          </motion.div>

                          <motion.div 
                             initial={{ opacity: 0, x: -20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.5 }}
                             className="relative"
                          >
                            <label className="block font-montserrat text-[9px] font-bold uppercase tracking-[0.4em] text-[#d4af37] mb-6">The Message</label>
                            <textarea
                              rows={4}
                              placeholder="Write your message here..."
                              value={wishForm.message}
                              onChange={(e) => {
                                setWishStatus("idle");
                                setWishForm((prev) => ({ ...prev, message: e.target.value }));
                              }}
                              className="w-full bg-transparent border-b-[0.5px] border-[#0ea5e9]/20 py-4 text-[#0ea5e9] font-cinzel text-xl tracking-widest placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all resize-none leading-relaxed"
                              required
                            />
                          </motion.div>

                          {(wishStatus === "success" || wishStatus === "error") && (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`text-[10px] text-center font-bold tracking-[0.2em] uppercase ${wishStatus === "success" ? "text-emerald-700" : "text-red-500"}`}
                            >
                              {wishStatus === "success" ? "✨ Your heart-felt wish has been sent ✨" : "Something went wrong. Please try again."}
                            </motion.p>
                          )}

                          <div className="flex flex-col items-center pt-8">
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={wishStatus === "sending"}
                              className="group relative overflow-hidden bg-[#0ea5e9] px-16 py-6 transition-all duration-500 disabled:opacity-50"
                            >
                              {/* Button Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              
                              <span className="relative z-10 flex items-center gap-4">
                                <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                                  {wishStatus === "sending" ? "Sending..." : "Send Your Blessing"}
                                </span>
                                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                              </span>
                            </motion.button>
                          </div>
                        </form>

                        {/* Corner Ornaments */}
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                           <Heart size={100} fill="#d4af37" stroke="none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative py-12 md:py-16 bg-[#0ea5e9] w-full flex flex-col items-center overflow-hidden z-20">
                {/* Immersive Silk Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Base Silk Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0369a1] via-[#0ea5e9] to-[#0369a1]" />
                  
                  {/* Subtle Paper Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

                  {/* Animated Background Monogram */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center select-none"
                  >
                    <span className="font-cinzel text-[30rem] font-bold text-[#d4af37]/5 tracking-tighter">UA</span>
                  </motion.div>

                  {/* Floating Silk Sparkles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -60, 0],
                        opacity: [0, 0.4, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                      }}
                      className="absolute w-1 h-1 bg-[#d4af37] rounded-full blur-[1px]"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100 + 50}%`
                      }}
                    />
                  ))}
                </div>

                <div className="w-full max-w-5xl px-6 flex flex-col items-center text-center relative z-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-montserrat text-[8px] md:text-[10px] tracking-[0.5em] text-[#d4af37]/70 uppercase font-bold mb-6">
                      The Beginning of Forever
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
                      <h2 className="font-alex text-4xl md:text-6xl text-white py-1 leading-none drop-shadow-2xl">
                        Tharusha
                      </h2>
                      <span className="font-serif text-2xl md:text-4xl text-[#d4af37] italic opacity-60">&amp;</span>
                      <h2 className="font-alex text-4xl md:text-6xl text-white py-1 leading-none drop-shadow-2xl">
                        Thinithi
                      </h2>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-6 overflow-hidden">
                       <span className="font-cinzel text-[9px] text-[#f7e7ce]/60 tracking-widest uppercase">March 12 | 2027</span>
                       <div className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
                       <span className="font-cinzel text-[9px] text-[#f7e7ce]/60 tracking-widest uppercase">Eagles Lagoon</span>
                    </div>
                  </motion.div>

                  {/* Copyright & Branding Bar */}
                  <div className="mt-12 pt-8 border-t border-[#d4af37]/10 w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-4 items-center">
                       <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-[#f7e7ce]/40 font-bold leading-relaxed flex items-center gap-4">
                        <span>© 2027 Tharusha & Thinithi</span>
                        <span className="text-[#d4af37]/20">|</span>
                        <span>All Rights Reserved</span>
                      </p>
                      
                      <a
                        href="https://wa.me/94707819074"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                      >
                        <span className="text-[9px] tracking-[0.2em] text-[#d4af37]/50 group-hover:text-[#d4af37] transition-all uppercase font-bold flex items-center gap-2">
                          Designed by invitemint
                        </span>
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="h-px w-0 bg-[#d4af37]/30 group-hover:w-full transition-all duration-700" 
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="auto"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0284c7] bg-white/95 text-[#0284c7] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(135,147,122,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(135,147,122,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0ea5e911;
        }
        ::-webkit-scrollbar-thumb {
          background: #0ea5e944;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AdminPanel />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsVisible(true);
    }
  }, []);

  const generateLink = () => {
    const fullName = prefix === "None" ? name : `${prefix} ${name}`;
    const urlSafeName = fullName.trim().replace(/\s+/g, "_");
    const link = `${baseUrl}?to=${urlSafeName}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-[200] max-w-sm w-full bg-white/90 backdrop-blur-xl border border-theme-200 rounded-2xl shadow-2xl p-6 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel font-bold text-theme-800 text-sm tracking-widest uppercase">
          Invitation Manager
        </h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <VolumeX className="w-4 h-4 rotate-45" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Base Hosted Link
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://your-wedding-site.com"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Prefix
          </label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          >
            <option>Mr. & Mrs.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Family</option>
            <option>Dear</option>
            <option>None</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Guest Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <button
          onClick={generateLink}
          className="w-full bg-[#0284c7] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#0369a1] transition-all"
        >
          Generate Personalized Link
        </button>

        {generatedLink && (
          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col gap-2">
            <p className="text-[9px] text-stone-500 break-all font-mono">{generatedLink}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-theme-200 transition-all"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-[9px] text-stone-400 leading-relaxed">
        Tip: Add <span className="font-bold">?admin=true</span> to any URL to open this menu again.
      </p>
    </div>
  );
}
