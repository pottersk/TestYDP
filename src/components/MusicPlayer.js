'use client';
import { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // เริ่มต้นเป็น false เพื่อรอการ interact ครั้งแรก
  const [currentTrack, setCurrentTrack] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('currentTrackIndex') || '0');
    }
    return 0;
  });
  const audioRef = useRef(null);
  
  // สามารถเพิ่มเพลง Lofi เพิ่มเติมได้ที่นี่
  const playlist = [
    '/music/lofi-1.mp3',
  ];

  // เริ่มเล่นเพลงอัตโนมัติเมื่อมีการโต้ตอบครั้งแรก
  useEffect(() => {
    let hasUserInteracted = false;

    const startPlayback = async () => {
      if (hasUserInteracted || !audioRef.current) return;
      
      hasUserInteracted = true;
      setHasInteracted(true);
      setIsPlaying(true);
      
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          // บันทึกสถานะลง localStorage เมื่อเล่นสำเร็จ
          localStorage.setItem('musicIsPlaying', 'true');
        }
      } catch (error) {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
        hasUserInteracted = false;
      }
    };

    const handleInteraction = () => {
      startPlayback();
    };

    // รอการโต้ตอบจากผู้ใช้ (คลิก, แตะ, เลื่อน, กดแป้น, ขยับเมาส์)
    const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  // จัดการการเล่นเพลงเมื่อ track เปลี่ยน หรือโหลดครั้งแรก
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        audio.load();
        
        if (isPlaying) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Playback error:", error);
              setIsPlaying(false);
            });
          }
        }
      } catch (error) {
        console.log("Playback error:", error);
        setIsPlaying(false);
      }
    };

    playAudio();

    // บันทึกสถานะลง localStorage
    localStorage.setItem('musicIsPlaying', isPlaying.toString());
    localStorage.setItem('currentTrackIndex', currentTrack.toString());
  }, [currentTrack, isPlaying]);

  // จัดการ play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasInteracted) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.log("Play error:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    setCurrentTrack((current) => (current + 1) % playlist.length);
    setIsPlaying(true);
  };

  const onEnded = () => {
    playNextTrack();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          
          {playlist.length > 1 && (
            <button
              onClick={playNextTrack}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
              aria-label="Next track"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          )}
          
          {/* แสดงสถานะ */}
          {isPlaying && (
            <div className="flex gap-1 ml-2">
              <span className="w-1 h-4 bg-purple-600 rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-purple-600 rounded-full animate-pulse delay-75"></span>
              <span className="w-1 h-4 bg-purple-600 rounded-full animate-pulse delay-150"></span>
            </div>
          )}
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={playlist[currentTrack]}
        onEnded={onEnded}
        preload="auto"
      />
    </div>
  );
};

export default MusicPlayer;