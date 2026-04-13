import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Howl } from 'howler';
import { 
  Heart, 
  Flower2, 
  Plane,
  MapPin,
  Gift,
  Camera,
  Sparkles,
  ChevronDown,
  Circle,
  Flame,
  Music,
  Volume2,
  VolumeX,
  X,
  Ticket,
  BookOpen,
  Users,
  Shirt
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Floating Decoration Component
const FloatingDecoration = ({ 
  icon: Icon, 
  className, 
  style, 
  animation = 'animate-float' 
}: { 
  icon: React.ElementType; 
  className?: string; 
  style?: React.CSSProperties;
  animation?: string;
}) => (
  <div className={`absolute pointer-events-none ${animation} ${className}`} style={style}>
    <Icon className="w-full h-full" />
  </div>
);

// Passport Stamp Component
const PassportStamp = ({ text, date, color = 'gold' }: { text: string; date?: string; color?: 'gold' | 'blue' }) => (
  <div className={`relative inline-block transform -rotate-12 opacity-80`}>
    <div className={`border-4 ${color === 'gold' ? 'border-[#d4af37]' : 'border-[#4a90d9]'} rounded-lg p-3`}>
      <div className={`border-2 ${color === 'gold' ? 'border-[#d4af37]' : 'border-[#4a90d9]'} rounded px-3 py-2`}>
        <p className={`font-serif text-xs ${color === 'gold' ? 'text-[#d4af37]' : 'text-[#4a90d9]'} uppercase tracking-widest`}>{text}</p>
        {date && <p className={`font-mono text-xs ${color === 'gold' ? 'text-[#d4af37]' : 'text-[#4a90d9]'} mt-1`}>{date}</p>}
      </div>
    </div>
  </div>
);

// Visa Page Component - supports top or bottom stamp position, default right side
// Visa Page Component - with adjustable top offset for stamps
const VisaPage = ({ 
  children, 
  title, 
  stamp, 
  stampAlign = 'right', 
  stampPosition = 'bottom',
  stampTopOffset = 16  // new prop: offset from top in pixels when stampPosition="top"
}: { 
  children: React.ReactNode; 
  title: string; 
  stamp?: { text: string; date?: string; color?: 'gold' | 'blue' }; 
  stampAlign?: 'left' | 'right';
  stampPosition?: 'top' | 'bottom';
  stampTopOffset?: number;
}) => (
  <div className="relative bg-gradient-to-br from-[#f4e4c1] to-[#e8dcc0] rounded-lg p-1 shadow-2xl">
    <div className="bg-white rounded-lg p-6 md:p-8 min-h-[400px] relative overflow-visible">
      {/* Visa Header */}
      <div className="flex items-center justify-between mb-6 border-b-2 border-[#1a2a44] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1a2a44] rounded-full flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-serif text-lg text-[#1a2a44] font-bold">VISA</p>
            <p className="font-mono text-xs text-[#1a2a44]/60">PHILIPPINES</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-[#1a2a44]/60">TYPE</p>
          <p className="font-serif text-sm text-[#1a2a44] font-bold">WEDDING</p>
        </div>
      </div>
      
      {/* Page Title */}
      <h3 className="font-script text-3xl text-[#1a2a44] mb-6">{title}</h3>
      
      {/* Content */}
      <div className="text-[#1a2a44]">{children}</div>
      
      {/* Stamp - positioned at top or bottom, right or left */}
      {stamp && (
        <div 
          className="absolute"
          style={{
            [stampPosition === 'top' ? 'top' : 'bottom']: stampPosition === 'top' ? `${stampTopOffset}px` : '16px',
            [stampAlign === 'right' ? 'right' : 'left']: '-30px'
          }}
        >
          <PassportStamp text={stamp.text} date={stamp.date} color={stamp.color || 'gold'} />
        </div>
      )}
      
      {/* Page Number */}
      <div className="absolute bottom-4 left-4">
        <p className="font-mono text-xs text-[#1a2a44]/40">🦋 <span className="text-[#1a2a44]">🌸 </span></p>
      </div>
    </div>
  </div>
);
// Main App Component
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const planeRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<Howl | null>(null);

  // Initialize sound
  useEffect(() => {
    soundRef.current = new Howl({
      src: ['https://file.garden/adnHgvVns05znNwx/%F0%9F%8E%B9%20Did%20your%20Valentine%20found%20you%20_%20%F0%9F%92%98%20_%F0%9F%8E%B9%20_tiktokmalaysia%20_pianotok%20_untilifoundyou%20_piano%20_music%20_stephensanchez%20_fyp(MP3).mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  // Toggle music
  const toggleMusic = useCallback(() => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Start music with invitation
  const startMusic = () => {
    if (soundRef.current && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    }
    setShowMusicPrompt(false);
  };

  // Add to sections array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Handle invitation open
  const handleOpenInvitation = () => {
    setIsOpen(true);
    setShowConfetti(true);
    startMusic();
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Handle close/reseal
  const handleReseal = () => {
    setIsOpen(false);
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth-following airplane on scroll
  useEffect(() => {
    if (!isOpen || !planeRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / docHeight;
      
      const startX = 10;
      const endX = 85;
      const x = startX + (endX - startX) * scrollPercent;
      
      const startY = 15;
      const endY = 85;
      const y = startY + (endY - startY) * scrollPercent;
      
      const wave = Math.sin(scrollPercent * Math.PI * 4) * 3;
      
      gsap.to(planeRef.current, {
        left: `${x + wave}%`,
        top: `${y}%`,
        rotation: wave * 2,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // GSAP Scroll Animations
  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.reveal-item'),
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Confetti Component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="confetti absolute"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
            width: `${10 + Math.random() * 10}px`,
            height: `${10 + Math.random() * 10}px`,
            backgroundColor: ['#d4af37', '#e8c76a', '#f4e4c1', '#4a90d9', '#ffffff'][Math.floor(Math.random() * 5)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );

  // Music Control Button
  const MusicControl = () => (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#1a2a44] border-2 border-[#d4af37] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-[#d4af37]" />
      ) : (
        <VolumeX className="w-5 h-5 text-[#d4af37]" />
      )}
    </button>
  );

  // Music Prompt Modal
  const MusicPrompt = () => (
    showMusicPrompt && !isOpen ? (
      <div className="fixed bottom-24 right-6 z-50 bg-[#1a2a44] border-2 border-[#d4af37] rounded-lg p-4 shadow-xl max-w-xs animate-fade-in-up">
        <button 
          onClick={() => setShowMusicPrompt(false)}
          className="absolute top-2 right-2 text-[#d4af37] hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-[#d4af37]" />
          <div>
            <p className="font-body text-sm text-[#f4e4c1]">Background music available!</p>
            <p className="font-body text-xs text-[#f4e4c1]/60">Tap seal to play</p>
          </div>
        </div>
      </div>
    ) : null
  );

const CoverSection = () => (
  <div className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] relative overflow-hidden">
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
        <path d="M100,500 Q200,300 400,400 Q600,500 800,300" stroke="#d4af37" strokeWidth="2" fill="none"/>
        <path d="M200,600 Q400,400 600,500 Q800,600 900,400" stroke="#4a90d9" strokeWidth="2" fill="none"/>
        <circle cx="200" cy="300" r="50" stroke="#d4af37" strokeWidth="1" fill="none"/>
        <circle cx="700" cy="600" r="80" stroke="#4a90d9" strokeWidth="1" fill="none"/>
      </svg>
      
      <FloatingDecoration icon={Flower2} className="w-24 h-24 text-[#d4af37]/20 top-16 left-16" animation="animate-float-slow"/>
      <FloatingDecoration icon={Flower2} className="w-20 h-20 text-[#4a90d9]/20 top-24 right-24" animation="animate-float-reverse"/>
      <FloatingDecoration icon={Heart} className="w-16 h-16 text-[#d4af37]/25 bottom-40 left-24" animation="animate-float"/>
      <FloatingDecoration icon={Circle} className="w-14 h-14 text-[#4a90d9]/20 bottom-32 right-20" animation="animate-float-slow"/>
      <FloatingDecoration icon={Plane} className="w-20 h-20 text-[#4a90d9]/15 top-1/2 left-10" animation="animate-float-reverse"/>
    </div>
    
    {Array.from({ length: 25 }).map((_, i) => (
      <div 
        key={i}
        className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-sparkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}

    <div className="text-center z-10 px-4 relative">
      <div className={`relative transition-all duration-1000 ${isOpen ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-80 h-[420px] mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6a] via-[#1a2a44] to-[#0a1628] rounded-lg border-4 border-[#d4af37] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 right-4 h-px bg-[#d4af37]"/>
              <div className="absolute bottom-4 left-4 right-4 h-px bg-[#d4af37]"/>
              <div className="absolute top-4 bottom-4 left-4 w-px bg-[#d4af37]"/>
              <div className="absolute top-4 bottom-4 right-4 w-px bg-[#d4af37]"/>
            </div>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <Plane className="w-16 h-16 text-[#d4af37]/40" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] via-[#e8c76a] to-[#d4af37] flex items-center justify-center mb-4 animate-pulse-glow shadow-lg">
                <Heart className="w-10 h-10 text-[#0a1628] fill-[#0a1628]" />
              </div>
              
              <p className="font-script text-4xl text-[#d4af37] mb-1">Wedding</p>
              <p className="font-serif text-3xl text-gold-gradient tracking-[0.3em] mb-6">PASSPORT</p>
              
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40" />
                <div className="absolute inset-2 rounded-full border border-[#d4af37]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-script text-6xl text-[#e8c76a]">M</span>
                  <span className="text-[#d4af37] text-3xl mx-1">&</span>
                  <span className="font-script text-6xl text-[#e8c76a]">M</span>
                </div>
              </div>
              
              <p className="font-body text-sm text-[#f4e4c1]/70 tracking-widest uppercase">
                To the Marriage of
              </p>
              <p className="font-script text-2xl text-[#e8c76a] mt-2">
                Mark & Mariel
              </p>
            </div>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/40"/>
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/60"/>
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/40"/>
            </div>
          </div>
          
{/* OPEN button - centered (same X as the top heart) */}
<button 
  onClick={handleOpenInvitation}
  style={{
    position: 'absolute',
    top: '50%',
    left: '35%',
    transform: 'translate(-50%, -50%)'
  }}
  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] via-[#e8c76a] to-[#b8960c] flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 z-20 animate-pulse-glow border-4 border-[#0a1628]"
>
  <div className="text-center">
    <Heart className="w-10 h-10 text-[#0a1628] fill-[#0a1628] mx-auto" />
    <p className="text-[10px] text-[#0a1628] font-bold mt-1">OPEN</p>
  </div>
</button>
        </div>
        
        <p className="mt-12 font-body text-[#f4e4c1]/70 text-lg">
          Tap the seal to open your invitation
        </p>
        <ChevronDown className="w-6 h-6 text-[#d4af37] mx-auto mt-4 animate-bounce" />
      </div>
    </div>
    
    <MusicPrompt />
  </div>
);
  // Main Content
  const MainContent = () => (
    <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
      
      {/* Smooth-Following Airplane */}
      <div 
        ref={planeRef}
        className="fixed z-40 pointer-events-none"
        style={{ left: '10%', top: '15%' }}
      >
        <div className="relative">
          <Plane className="w-12 h-12 text-[#4a90d9] transform -rotate-45 drop-shadow-lg" />
          <svg className="absolute top-full left-0 w-20 h-32 -mt-2" viewBox="0 0 80 120">
            <path 
              d="M40,0 Q30,30 40,60 Q50,90 40,120" 
              stroke="#4a90d9" 
              strokeWidth="2" 
              strokeDasharray="5,5"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Section 1: Passport Cover Page */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] relative">
        <FloatingDecoration icon={Flower2} className="w-28 h-28 text-[#d4af37]/15 top-16 left-10" />
        <FloatingDecoration icon={Flower2} className="w-24 h-24 text-[#4a90d9]/15 top-20 right-16" animation="animate-float-reverse" />
        <FloatingDecoration icon={Heart} className="w-16 h-16 text-[#d4af37]/20 bottom-32 left-20" />
        <FloatingDecoration icon={Circle} className="w-14 h-14 text-[#4a90d9]/20 bottom-24 right-24" animation="animate-float-slow" />
        
        <div className="text-center z-10 px-4">
          <div className="reveal-item mb-6">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"/>
              <Plane className="w-8 h-8 text-[#4a90d9]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"/>
            </div>
            <p className="font-script text-5xl md:text-7xl text-[#d4af37] mb-2">Wedding</p>
            <p className="font-serif text-4xl md:text-6xl text-gold-gradient tracking-[0.3em]">PASSPORT</p>
          </div>
          
          <div className="reveal-item w-56 h-56 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/30 animate-rotate-slow" />
            <div className="absolute inset-4 rounded-full border-2 border-[#d4af37]/20" />
            <div className="absolute inset-8 rounded-full border border-[#4a90d9]/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-script text-8xl text-[#e8c76a] block">M</span>
                <span className="text-[#d4af37] text-4xl">&</span>
                <span className="font-script text-8xl text-[#e8c76a] block">M</span>
              </div>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2">
              <Flower2 className="w-12 h-12 text-[#d4af37]/40" />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <Flower2 className="w-12 h-12 text-[#d4af37]/40 transform scale-x-[-1]" />
            </div>
          </div>
          
          <div className="reveal-item">
            <p className="font-body text-lg text-[#f4e4c1]/80 tracking-widest uppercase mb-4">
              To the Marriage of
            </p>
            <p className="font-script text-4xl md:text-6xl text-[#e8c76a] mb-2">
              Mark Anthony <span className="text-[#d4af37]">&</span> Mariel
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-12 bg-[#d4af37]/40"/>
              <p className="font-serif text-3xl text-[#d4af37]">04.25.26</p>
              <div className="h-px w-12 bg-[#d4af37]/40"/>
            </div>
          </div>
          
          <div className="reveal-item mt-8">
            <PassportStamp text="APPROVED" date="APR 25 2026" color="blue" />
          </div>
        </div>
      </section>

      {/* Section 2: Our Love Story */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] to-[#1a2a44] py-20">
        <div className="container mx-auto px-4">
          <VisaPage title="Our Love Story" stamp={{ text: 'LOVE', date: 'FOREVER' }}>
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
              <p className="font-body text-lg text-[#1a2a44]/80 italic mb-8">
                "Two souls, one heart, forever intertwined"
              </p>
              
              <div className="max-w-sm mx-auto">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37] to-[#4a90d9] rounded-lg opacity-50 blur-sm"/>
                  <div className="relative bg-white rounded-lg overflow-hidden border-4 border-[#1a2a44]">
                    <img 
                      src="/images/1000220405.jpg" 
                      alt="Mark and Mariel" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-[#d4af37]"/>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-[#d4af37]"/>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-[#d4af37]"/>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-[#d4af37]"/>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
                <Heart className="w-6 h-6 text-[#4a90d9] fill-[#4a90d9]" />
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
              </div>
            </div>
          </VisaPage>
        </div>
      </section>

      {/* Section 3: Parents */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4">
          <VisaPage title="Together With Our Parents">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1a2a44]/10 to-[#4a90d9]/10 rounded-lg p-6 border-2 border-[#1a2a44]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#d4af37]" />
                  <p className="font-serif text-lg text-[#1a2a44] font-bold">Bride's Parents</p>
                </div>
                <p className="font-body text-lg text-[#1a2a44]">Mr. Ramil R. Perin</p>
                <p className="font-body text-lg text-[#1a2a44]">Mrs. Marissa P. Perin</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#1a2a44]/10 to-[#4a90d9]/10 rounded-lg p-6 border-2 border-[#1a2a44]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-[#4a90d9]" />
                  <p className="font-serif text-lg text-[#1a2a44] font-bold">Groom's Parents</p>
                </div>
                <p className="font-body text-lg text-[#1a2a44]">Mr. Manolo A. Belarmino</p>
                <p className="font-body text-lg text-[#1a2a44]">Mrs. Doreen R. Belarmino</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-body text-[#1a2a44]/70 italic">
                "In the presence of our Lord Jesus Christ, together with our beloved parents"
              </p>
            </div>
          </VisaPage>
        </div>
      </section>

      {/* Section 4: Wedding Details - Boarding Pass Style */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="reveal-item text-center mb-8">
            <Ticket className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
            <p className="font-script text-4xl text-[#e8c76a]">Boarding Pass</p>
            <p className="font-serif text-lg text-[#d4af37] tracking-widest">PASSPORT TO MARRIAGE</p>
          </div>
          
          <div className="reveal-item">
            <div className="bg-gradient-to-r from-[#f4e4c1] to-[#e8dcc0] rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-[#1a2a44] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-8 h-8 text-[#d4af37]" />
                  <span className="font-serif text-xl text-white tracking-widest">M&M AIRLINES</span>
                </div>
                <span className="font-mono text-[#d4af37]">04252026</span>
              </div>
              
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-xs text-[#1a2a44]/60 uppercase">Date</p>
                    <p className="font-serif text-2xl text-[#1a2a44] font-bold">April 25, 2026</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#1a2a44]/60 uppercase">Time</p>
                    <p className="font-serif text-2xl text-[#1a2a44] font-bold">9:00 AM</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#1a2a44]/60 uppercase">Class</p>
                    <p className="font-serif text-xl text-[#1a2a44]">WEDDING</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-xs text-[#1a2a44]/60 uppercase">Ceremony</p>
                    <p className="font-body text-lg text-[#1a2a44] font-semibold">San Lorenzo Ruiz de Manila Parish Church</p>
                    <p className="font-body text-sm text-[#1a2a44]/70">San Isidro, General Luna, Quezon</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#1a2a44]/60 uppercase">Reception</p>
                    <p className="font-body text-lg text-[#1a2a44] font-semibold">Brgy. Cutcutan Covered Court</p>
                    <p className="font-body text-sm text-[#1a2a44]/70">Catanauan, Quezon</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t-2 border-dashed border-[#1a2a44]/30 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-[#1a2a44]"
                      style={{ height: `${20 + Math.random() * 20}px` }}
                    />
                  ))}
                </div>
                <PassportStamp text="BOARDING" date="APR 25" color="blue" />
              </div>
            </div>
          </div>
          
          <div className="reveal-item mt-8 max-w-xs mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#4a90d9] rounded-lg opacity-60"/>
              <img 
                src="/images/1000220407.jpg" 
                alt="Passport Photo" 
                className="relative w-full h-auto object-cover rounded-lg border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Principal Sponsors */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4">
          <VisaPage title="Principal Sponsors" stamp={{ text: 'WITNESS', date: 'APR 25', color: 'blue' }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Mr. Alvin R. Casidsid',
                'Mr. Edwin P. Monterey',
                'Mr. Emmanuel P. Principe',
                'Mr. Crisanto F. Melecia',
                'Ms. Rebie A. Marciano',
                'Mrs. Glenda P. Puertollano',
                'Mrs. Thelma P. Magpantay',
                'Mrs. Sheila M. Rioflorido',
              ].map((name, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1a2a44]/5 rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#4a90d9] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="font-body text-[#1a2a44]">{name}</p>
                </div>
              ))}
            </div>
          </VisaPage>
        </div>
      </section>

{/* Section 6: Secondary Sponsors - stamp moved to TOP and lowered */}
<section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] py-20">
  <div className="container mx-auto px-4">
    <VisaPage 
      title="Secondary Sponsors" 
      stamp={{ text: 'ENTOURAGE', date: '2026' }}
      stampPosition="top"
      stampTopOffset={60}
    >
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-lg p-4 border-2 border-[#d4af37]/30">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-[#d4af37]" />
            <p className="font-serif text-sm text-[#1a2a44] font-bold">Candle</p>
          </div>
          <p className="font-body text-sm text-[#1a2a44]">Mr. Albert R. Casidsid</p>
          <p className="font-body text-sm text-[#1a2a44]">Ms. Emalyn P. Belarmino</p>
        </div>
        
        <div className="bg-gradient-to-br from-[#4a90d9]/20 to-[#4a90d9]/5 rounded-lg p-4 border-2 border-[#4a90d9]/30">
          <div className="flex items-center gap-2 mb-3">
            <Circle className="w-5 h-5 text-[#4a90d9]" />
            <p className="font-serif text-sm text-[#1a2a44] font-bold">Cord</p>
          </div>
          <p className="font-body text-sm text-[#1a2a44]">Mr. Jerome I. Reforma</p>
          <p className="font-body text-sm text-[#1a2a44]">Ms. April Joy P. Rejano</p>
        </div>
        
        <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-lg p-4 border-2 border-[#d4af37]/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <p className="font-serif text-sm text-[#1a2a44] font-bold">Veil</p>
          </div>
          <p className="font-body text-sm text-[#1a2a44]">Mr. Edison P. Belarmino</p>
          <p className="font-body text-sm text-[#1a2a44]">Ms. Maricon P. Perin</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-serif text-lg text-[#1a2a44] font-bold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Best Man
          </p>
          <p className="font-body text-[#1a2a44] bg-[#1a2a44]/5 rounded-lg p-3">Mr. John Paul B. Rey</p>
          
          <p className="font-serif text-lg text-[#1a2a44] font-bold mb-3 mt-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Maid of Honor
          </p>
          <p className="font-body text-[#1a2a44] bg-[#1a2a44]/5 rounded-lg p-3">Ms. Marinel P. Perin</p>
        </div>
        
        <div>
          <p className="font-serif text-lg text-[#1a2a44] font-bold mb-3">Groomsmen</p>
          <div className="space-y-1">
            {['Mr. Tristan A. Moreno', 'Mr. Joshua P. Peñaredonda', 'Mr. John Orly N. Belarmino', 'Mr. John Kenneth R. Murillo', 'Mr. Chester John R. Monterey', 'Mr. Angelo P. Belarmino'].map((name, i) => (
              <p key={i} className="font-body text-sm text-[#1a2a44] bg-[#1a2a44]/5 rounded p-2">{name}</p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="font-serif text-lg text-[#1a2a44] font-bold mb-3">Bridesmaids</p>
        <div className="flex flex-wrap gap-2">
          {['Ms. Micah Ella P. Perin', 'Ms. Mae Princess R. Belarmino', 'Ms. Maridel P. Perin', 'Ms. Janine Trisha P. So', 'Ms. Nicole A. Recalde', 'Ms. Razel C. Perin'].map((name, i) => (
            <span key={i} className="font-body text-sm text-[#1a2a44] bg-[#1a2a44]/5 rounded-full px-3 py-1">{name}</span>
          ))}
        </div>
      </div>
    </VisaPage>
  </div>
</section>

      {/* Section 7: Flower Girls & Bearers - no stamp */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4">
          <VisaPage title="Flower Girls & Bearers">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-lg p-4">
                <Circle className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <p className="font-serif text-sm text-[#1a2a44] font-bold mb-2">Ring Bearer</p>
                <p className="font-body text-sm text-[#1a2a44]">Kent Jezreel M. Peñaredonda</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-[#4a90d9]/10 to-transparent rounded-lg p-4">
                <BookOpen className="w-8 h-8 text-[#4a90d9] mx-auto mb-2" />
                <p className="font-serif text-sm text-[#1a2a44] font-bold mb-2">Bible Bearer</p>
                <p className="font-body text-sm text-[#1a2a44]">Ace Jairus B. Peñaflor</p>
              </div>
              
              <div className="text-center bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-lg p-4">
                <Circle className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                <p className="font-serif text-sm text-[#1a2a44] font-bold mb-2">Coin Bearer</p>
                <p className="font-body text-sm text-[#1a2a44]">Jan Andrei P. Perin</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#4a90d9]/10 to-[#d4af37]/10 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Flower2 className="w-6 h-6 text-[#d4af37]" />
                <p className="font-serif text-lg text-[#1a2a44] font-bold">Flower Girls</p>
                <Flower2 className="w-6 h-6 text-[#4a90d9]" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Cristal Shane B. Rogel', 'Azaliah Reign P. Halina', 'Maysey M. Ramiro', 'Kaith Xyrille Mei C. Romasanta', 'Nisha P. Belarmino'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#4a90d9] text-white text-xs flex items-center justify-center">{i + 1}</span>
                    <p className="font-body text-sm text-[#1a2a44]">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="font-serif text-lg text-[#1a2a44] font-bold mb-2">Banner Bearers</p>
              <div className="flex justify-center gap-4">
                <p className="font-body text-[#1a2a44] bg-[#1a2a44]/5 rounded-lg px-4 py-2">Hector Therick B. Mascariñas</p>
                <p className="font-body text-[#1a2a44] bg-[#1a2a44]/5 rounded-lg px-4 py-2">Vince P. Halina</p>
              </div>
            </div>
          </VisaPage>
        </div>
      </section>

      {/* Section 8: Gift Guide & Snap and Share - removed GRATEFUL HEARTS stamp */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal-item">
              <VisaPage title="Gift Guide">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                  <p className="font-body text-[#1a2a44]/80 leading-relaxed">
                    With all that we have, we've been truly blessed. Your presence and prayers are all that we request, but if you desire to give nonetheless, in kind we'll do.
                  </p>
                </div>
              </VisaPage>
            </div>
            
            <div className="reveal-item">
              <VisaPage title="Snap & Share">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-[#4a90d9] mx-auto mb-4" />
                  <p className="font-body text-[#1a2a44]/80 leading-relaxed mb-4">
                    Help us capture moments during our big day by using our official hashtag.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37]/20 to-[#4a90d9]/20 rounded-full px-4 py-2">
                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                    <p className="font-serif text-lg text-[#1a2a44] font-bold">#MarielFoundHerMark</p>
                  </div>
                </div>
              </VisaPage>
            </div>
          </div>
        </div>
      </section>


{/* Section 9: Dress Code */}
<section ref={addToRefs} className="section-full bg-gradient-to-b from-[#1a2a44] to-[#0a1628] py-20">
  <div className="container mx-auto px-4">
    <VisaPage title="Dress Code" stamp={{ text: 'DRESS', date: 'STYLE' }}>
      <div className="flex items-center justify-center gap-3 mb-6">
        <Shirt className="w-8 h-8 text-[#4a90d9]" />
        <p className="font-serif text-xl text-[#1a2a44] font-bold">ATTIRE GUIDE</p>
      </div>
      
      <p className="font-body text-lg text-[#1a2a44] text-center mb-2">
        Semi-Formal / Casual Attire
      </p>
      <p className="font-body text-[#1a2a44]/70 text-center mb-6">
        Guests are encouraged to wear comfortable yet polished outfits suitable for a wedding celebration.
      </p>
      
      <div className="bg-gradient-to-r from-[#1a2a44]/5 to-[#4a90d9]/5 rounded-lg p-6">
        <p className="font-body text-[#1a2a44] text-center mb-4">
          We kindly encourage our guests to dress in colors from our color palette:
        </p>
        
        {/* 4 colors in a single row on desktop, wrap on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {[
            { color: '#7a9cc6', name: 'Sky' },
            { color: '#4a6fa5', name: 'Ocean' },
            { color: '#2e4a7a', name: 'Deep' },
            { color: '#1a3a6a', name: 'Navy' }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div 
                className="w-14 h-14 rounded-full border-4 border-white shadow-lg mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="font-mono text-xs text-[#1a2a44]/60">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </VisaPage>
  </div>
</section>

      {/* Section 10: Bible Verse & Closing - heart instead of stamp */}
      <section ref={addToRefs} className="section-full bg-gradient-to-b from-[#0a1628] via-[#1a2a44] to-[#0a1628] py-20">
        <div className="container mx-auto px-4">
          <VisaPage title="Our Promise">
            <div className="text-center py-8">
              <Heart className="w-16 h-16 text-[#d4af37] mx-auto mb-6 animate-heartbeat" />
              
              <p className="font-body text-2xl md:text-3xl text-[#1a2a44] italic leading-relaxed mb-6">
                "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.... Love never fails."
              </p>
              
              <p className="font-serif text-xl text-[#4a90d9] font-semibold">- 1 Corinthians 13:4-7</p>
            </div>
            
            {/* Decorative heart in corner instead of stamp */}
            <div className="absolute bottom-4 right-4">
              <Heart className="w-8 h-8 text-[#d4af37] opacity-60" />
            </div>
          </VisaPage>
          
          {/* Final Message */}
          <div className="reveal-item mt-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af37]"/>
              <Plane className="w-10 h-10 text-[#4a90d9]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af37]"/>
            </div>
            
            <p className="font-script text-6xl md:text-7xl text-[#e8c76a] mb-4">
              Mark <span className="text-[#d4af37]">&</span> Mariel
            </p>
            <p className="font-serif text-2xl text-[#f4e4c1]/80 tracking-[0.3em] mb-8">
              FOREVER AND ALWAYS
            </p>
            
            <button
              onClick={handleReseal}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#e8c76a] text-[#0a1628] font-serif font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg animate-pulse-glow"
            >
              <Heart className="w-6 h-6 fill-[#0a1628]" />
              Close & Seal Again
              <Heart className="w-6 h-6 fill-[#0a1628]" />
            </button>
            
            <p className="font-body text-sm text-[#f4e4c1]/50 mt-4">
              Tap to close the invitation
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0a1628] border-t border-[#d4af37]/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
            <Heart className="w-5 h-5 text-[#4a90d9] fill-[#4a90d9]" />
            <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
          </div>
          <p className="font-body text-[#f4e4c1]/60 text-sm">
            Made with love for Mark & Mariel
          </p>
          <p className="font-body text-[#d4af37] text-lg mt-2 font-serif">
            #MarielFoundHerMark
          </p>
        </div>
      </footer>
    </div>
  );

  return (
    <div ref={containerRef} className="relative">
      {showConfetti && <Confetti />}
      
      {!isOpen && <CoverSection />}
      
      <MainContent />
      
      {isOpen && <MusicControl />}
      
      {isOpen && (
        <>
          <FloatingDecoration 
            icon={Flower2} 
            className="w-10 h-10 text-[#d4af37]/10 fixed top-20 left-4 z-0"
            animation="animate-float-slow"
          />
          <FloatingDecoration 
            icon={Heart} 
            className="w-8 h-8 text-[#d4af37]/10 fixed bottom-20 right-4 z-0"
            animation="animate-float"
          />
        </>
      )}
    </div>
  );
}

export default App;
