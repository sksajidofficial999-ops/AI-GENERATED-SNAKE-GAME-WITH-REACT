import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#0ff] font-sans selection:bg-[#f0f] selection:text-black overflow-hidden relative flex flex-col screen-tear">
      <div className="noise-overlay" />
      <div className="scanlines" />
      
      <header className="relative z-10 p-4 border-b-4 border-[#f0f] bg-black flex items-center justify-between shadow-[0_4px_0_#f0f]">
        <div className="flex items-center gap-4">
          <Terminal className="text-[#0ff]" size={32} />
          <h1 className="text-xl md:text-3xl font-mono text-[#0ff] uppercase tracking-tighter glitch-text" data-text="SYS.OP.SNAKE_SYNTH">
            SYS.OP.SNAKE_SYNTH
          </h1>
        </div>
        <div className="text-[#f0f] font-mono text-xs md:text-sm animate-pulse hidden md:block">
          [STATUS: COMPROMISED]
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 gap-4">
        <SnakeGame />
      </main>

      <footer className="relative z-10 p-4 border-t-4 border-[#0ff] bg-black mt-auto shadow-[0_-4px_0_#0ff]">
        <MusicPlayer />
      </footer>
    </div>
  );
}
