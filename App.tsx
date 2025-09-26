
import React, { useState, useCallback } from 'react';
import type { User, Song, CurrentSong } from './types';
import SetupSection from './components/SetupSection';
import GameSection from './components/GameSection';
import { MusicNoteIcon } from './components/icons';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleAddUser = useCallback((name: string) => {
    setUsers(prevUsers => {
      if (prevUsers.some(u => u.name.toLowerCase() === name.toLowerCase())) {
        return prevUsers; // Avoid duplicate names
      }
      const newUser: User = { id: Date.now(), name };
      return [...prevUsers, newUser];
    });
  }, []);

  const handleAddSong = useCallback((trackId: string, userId: number) => {
    const newSong: Song = { id: Date.now(), trackId, submittedBy: userId };
    setSongs(prevSongs => [...prevSongs, newSong]);
  }, []);

  const handlePlayRandomSong = useCallback(() => {
    if (songs.length === 0) return;

    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const submitter = users.find(u => u.id === randomSong.submittedBy);

    if (submitter) {
      setCurrentSong({
        ...randomSong,
        submitterName: submitter.name,
      });
      setIsRevealed(false);
    }
  }, [songs, users]);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4">
             <MusicNoteIcon className="w-10 h-10 text-green-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Who Submitted It?
            </h1>
          </div>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            A Spotify guessing game for you and your friends. Add players, submit songs, and find out who has the best taste in music!
          </p>
        </header>

        <main className="space-y-8">
          <SetupSection users={users} songs={songs} onAddUser={handleAddUser} onAddSong={handleAddSong} />
          <GameSection 
            songs={songs} 
            users={users} 
            currentSong={currentSong} 
            isRevealed={isRevealed} 
            onPlayRandom={handlePlayRandomSong} 
            onReveal={handleReveal} 
          />
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by React, Tailwind CSS, and the Spotify Embed API.</p>
        </footer>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-in-out;
        }
    `}</style>
    </div>
  );
};

export default App;
