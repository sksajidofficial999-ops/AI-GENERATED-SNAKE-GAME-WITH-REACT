import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, TerminalSquare } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "SEQ_01: NEON_DRIVE",
    artist: "AI_CORE_ALPHA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "SEQ_02: CYBER_CITY",
    artist: "AI_CORE_BETA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "SEQ_03: DIGI_HORIZON",
    artist: "AI_CORE_GAMMA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black border-4 border-[#0ff] p-4 relative overflow-hidden font-mono shadow-[8px_8px_0_#f0f]">
      
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 w-full border-2 border-[#f0f] p-2">
          <div className={`w-12 h-12 bg-[#f0f] flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
            <TerminalSquare className="text-black" size={24} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[#0ff] font-bold truncate text-[10px] md:text-xs">
              {"> "} {currentTrack.title}
            </span>
            <span className="text-[#f0f] text-[10px] truncate">
              SRC: {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={prevTrack}
              className="text-[#0ff] hover:text-[#f0f] hover:bg-[#0ff]/20 p-1 border-2 border-transparent hover:border-[#f0f] transition-none"
            >
              <SkipBack size={24} />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-black border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-none"
            >
              {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
            </button>
            
            <button 
              onClick={nextTrack}
              className="text-[#0ff] hover:text-[#f0f] hover:bg-[#0ff]/20 p-1 border-2 border-transparent hover:border-[#f0f] transition-none"
            >
              <SkipForward size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div 
            className="w-full md:w-64 h-4 bg-black border-2 border-[#0ff] cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-[#f0f] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 w-32 border-2 border-[#0ff] p-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#f0f] hover:text-[#0ff]"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

      </div>
    </div>
  );
}
