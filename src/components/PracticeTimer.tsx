'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Minimize2, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Flame, 
  Clock, 
  AlertCircle,
  X
} from 'lucide-react';
import { addTimerSeconds, recordActivity } from '@/lib/achievements';

export default function PracticeTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mode, setMode] = useState<'countdown' | 'stopwatch'>('countdown');
  const [initialSeconds, setInitialSeconds] = useState(25 * 60); // default 25 min (Medium)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const accumulatedActiveSeconds = useRef(0);

  // Interval handler
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        accumulatedActiveSeconds.current += 1;

        if (mode === 'countdown') {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              setIsFinished(true);
              // Play chime if enabled
              if (soundEnabled && typeof window !== 'undefined') {
                try {
                  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  osc.type = 'sine';
                  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
                  gain.gain.setValueAtTime(0.2, ctx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  osc.start();
                  osc.stop(ctx.currentTime + 0.6);
                } catch (e) {}
              }
              return 0;
            }
            return prev - 1;
          });
        } else {
          setStopwatchSeconds((prev) => prev + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, soundEnabled]);

  // Periodically flush accumulated time to achievement tracker
  useEffect(() => {
    const flushInterval = setInterval(() => {
      if (accumulatedActiveSeconds.current > 0) {
        addTimerSeconds(accumulatedActiveSeconds.current);
        accumulatedActiveSeconds.current = 0;
      }
    }, 10000);

    return () => {
      clearInterval(flushInterval);
      if (accumulatedActiveSeconds.current > 0) {
        addTimerSeconds(accumulatedActiveSeconds.current);
        accumulatedActiveSeconds.current = 0;
      }
    };
  }, []);

  const handleStartPause = () => {
    if (isFinished) {
      setIsFinished(false);
      setSecondsLeft(initialSeconds);
    }
    setIsRunning(!isRunning);
    if (!isRunning) {
      recordActivity(1);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    if (mode === 'countdown') {
      setSecondsLeft(initialSeconds);
    } else {
      setStopwatchSeconds(0);
    }
  };

  const setPreset = (mins: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setInitialSeconds(mins * 60);
    setSecondsLeft(mins * 60);
    setMode('countdown');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Calculate progress percent
  const progress = mode === 'countdown'
    ? initialSeconds > 0 ? ((initialSeconds - secondsLeft) / initialSeconds) * 100 : 0
    : 100;

  // Floating trigger button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-xl border shadow-xl transition duration-300 active:scale-95 ${
            isRunning
              ? 'bg-blue-600/90 text-white border-blue-400/50 shadow-blue-500/30 animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80'
          }`}
        >
          <Clock className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'text-blue-400'}`} style={{ animationDuration: '4s' }} />
          <span className="text-xs font-bold font-mono">
            {isRunning
              ? (mode === 'countdown' ? formatTime(secondsLeft) : formatTime(stopwatchSeconds))
              : 'Practice Timer'}
          </span>
        </button>
      </div>
    );
  }

  // Floating widget dialog
  return (
    <div className="fixed bottom-6 right-6 z-40 transition-all duration-300">
      <div className="glass-card rounded-2xl p-5 border border-slate-700/80 shadow-2xl shadow-black/60 w-80 space-y-4 relative bg-slate-950/95 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Timer className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-white">DSA Practice Timer</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => {
              setIsRunning(false);
              setMode('countdown');
            }}
            className={`py-1.5 rounded-lg transition ${
              mode === 'countdown' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Countdown
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setMode('stopwatch');
            }}
            className={`py-1.5 rounded-lg transition ${
              mode === 'stopwatch' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Stopwatch
          </button>
        </div>

        {/* Presets (Only in Countdown mode) */}
        {mode === 'countdown' && (
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setPreset(15)}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition ${
                initialSeconds === 15 * 60
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              15m (Easy)
            </button>
            <button
              onClick={() => setPreset(25)}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition ${
                initialSeconds === 25 * 60
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              25m (Med)
            </button>
            <button
              onClick={() => setPreset(45)}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition ${
                initialSeconds === 45 * 60
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              45m (Hard)
            </button>
          </div>
        )}

        {/* Big Time Display */}
        <div className="text-center py-3 bg-slate-900/60 rounded-xl border border-slate-800/80 relative overflow-hidden">
          {/* Progress bar background in countdown mode */}
          {mode === 'countdown' && (
            <div
              className="absolute left-0 bottom-0 top-0 bg-blue-600/10 transition-all duration-1000 -z-0 pointer-events-none"
              style={{ width: `${progress}%` }}
            />
          )}

          <div
            className={`text-4xl font-extrabold font-mono tracking-wider transition ${
              isFinished
                ? 'text-rose-400 animate-pulse'
                : isRunning
                ? 'text-white'
                : 'text-slate-300'
            }`}
          >
            {mode === 'countdown' ? formatTime(secondsLeft) : formatTime(stopwatchSeconds)}
          </div>

          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1 font-medium">
            {isFinished ? (
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Time’s up! Review solution.
              </span>
            ) : isRunning ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Flame className="w-3 h-3 animate-pulse" /> Focus Mode Active
              </span>
            ) : (
              <span>Target: Solve before timer expires</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartPause}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition shadow-lg active:scale-98 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> {isFinished ? 'Restart' : 'Start Focus'}
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            title="Reset Timer"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700/60"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
