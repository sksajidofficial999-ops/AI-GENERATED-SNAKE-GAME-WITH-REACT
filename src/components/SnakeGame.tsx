import { useSnakeGame } from '../hooks/useSnakeGame';
import { Play, RotateCcw, Pause } from 'lucide-react';

export function SnakeGame() {
  const {
    snake,
    food,
    gameOver,
    score,
    highScore,
    isPaused,
    GRID_SIZE,
    resetGame,
    setIsPaused
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-black border-4 border-[#0ff] shadow-[8px_8px_0_#f0f]">
      
      {/* Header / Scoreboard */}
      <div className="flex justify-between w-full mb-6 font-mono text-[10px] md:text-xs">
        <div className="flex flex-col">
          <span className="text-[#f0f] uppercase tracking-widest">MEM_ALLOC</span>
          <span className="text-xl text-[#0ff]">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#f0f] uppercase tracking-widest">PEAK_MEM</span>
          <span className="text-xl text-[#0ff]">{highScore.toString().padStart(4, '0')}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative group">
        <div 
          className="grid bg-black border-4 border-[#f0f]"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: 'min(100%, 400px)',
            aspectRatio: '1 / 1'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((segment, idx) => idx !== 0 && segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`w-full h-full border-[1px] border-[#0ff]/20 ${
                  isSnakeHead 
                    ? 'bg-[#0ff]' 
                    : isSnakeBody 
                      ? 'bg-[#0ff]/70'
                      : isFood 
                        ? 'bg-[#f0f] animate-pulse'
                        : 'bg-transparent'
                }`}
              />
            );
          })}
        </div>

        {/* Overlays */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center border-4 border-[#f0f]">
            <div className="flex flex-col items-center mb-6">
              <h2 
                className="text-2xl md:text-4xl font-mono text-[#f0f] tracking-widest glitch-text leading-none text-center"
                data-text="FATAL_ERR"
              >
                FATAL_ERR
              </h2>
            </div>
            <p className="text-[#0ff] font-mono mb-6 text-xs">DUMP: {score.toString().padStart(4, '0')}</p>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-colors font-mono uppercase text-[10px]"
            >
              <RotateCcw size={16} /> EXEC_REBOOT
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center border-4 border-[#0ff]">
            <h2 className="text-2xl md:text-3xl font-mono text-[#0ff] mb-6 tracking-widest glitch-text" data-text="HALTED">HALTED</h2>
            <button 
              onClick={() => setIsPaused(false)}
              className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-[#f0f] text-[#f0f] hover:bg-[#f0f] hover:text-black transition-colors font-mono uppercase text-[10px]"
            >
              <Play size={16} /> RESUME_EXEC
            </button>
          </div>
        )}
      </div>

      {/* Controls Help */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 text-[#0ff] font-mono text-[10px] text-center">
        <div>
          INPUT: <span className="bg-[#f0f] text-black px-1">WASD</span> / <span className="bg-[#f0f] text-black px-1">ARROWS</span>
        </div>
        <div>
          INTERRUPT: <span className="bg-[#0ff] text-black px-1">SPACE</span>
        </div>
      </div>
    </div>
  );
}
