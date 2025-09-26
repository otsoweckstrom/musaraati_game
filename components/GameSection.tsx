
import React from 'react';
import type { CurrentSong, Song, User } from '../types';
import SpotifyPlayer from './SpotifyPlayer';
import { PlayIcon, RevealIcon } from './icons';

interface GameSectionProps {
  songs: Song[];
  users: User[];
  currentSong: CurrentSong | null;
  isRevealed: boolean;
  onPlayRandom: () => void;
  onReveal: () => void;
}

const GameSection: React.FC<GameSectionProps> = ({ songs, currentSong, isRevealed, onPlayRandom, onReveal }) => {
  const canPlay = songs.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 backdrop-blur-sm mt-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        3. Game Time!
      </h2>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onPlayRandom}
          disabled={!canPlay}
          className="w-full max-w-xs bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg flex items-center justify-center gap-3 text-lg"
        >
          <PlayIcon className="w-7 h-7" />
          Play a Random Song
        </button>

        {currentSong && (
          <div className="w-full mt-4 animate-fade-in space-y-6">
            <SpotifyPlayer trackId={currentSong.trackId} />

            <div className="text-center">
                <button
                onClick={onReveal}
                disabled={isRevealed}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                    <RevealIcon className="w-6 h-6" />
                    Reveal Submitter
                </button>
            </div>

            {isRevealed && (
              <div className="mt-4 text-center p-4 bg-gray-900/50 rounded-lg animate-fade-in-up">
                <p className="text-gray-400">This song was submitted by:</p>
                <p className="text-3xl font-bold text-green-400 mt-1">
                  {currentSong.submitterName}
                </p>
              </div>
            )}
          </div>
        )}

        {!canPlay && (
            <p className="text-gray-400 mt-4">Add some songs in Step 2 to start playing.</p>
        )}
      </div>
    </div>
  );
};

export default GameSection;
