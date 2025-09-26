
import React, { useState } from 'react';
import type { User, Song } from '../types';
import { MusicNoteIcon, UserPlusIcon } from './icons';

interface SetupSectionProps {
  users: User[];
  songs: Song[];
  onAddUser: (name: string) => void;
  onAddSong: (trackId: string, userId: number) => void;
}

const SetupSection: React.FC<SetupSectionProps> = ({ users, songs, onAddUser, onAddSong }) => {
  const [newUserName, setNewUserName] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
    }
  };

  const extractTrackId = (url: string): string | null => {
    const match = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError('Please select a player to add a song.');
      return;
    }
    const trackId = extractTrackId(spotifyUrl);
    if (trackId) {
      onAddSong(trackId, selectedUserId);
      setSpotifyUrl('');
      setError('');
    } else {
      setError('Invalid Spotify track URL. Please use the format: https://open.spotify.com/track/...');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* User Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <UserPlusIcon className="w-7 h-7 text-green-400" />
            1. Add Players
          </h2>
          <form onSubmit={handleAddUser} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter player name"
              className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
              Add
            </button>
          </form>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="bg-gray-700 rounded-md px-4 py-2 text-gray-200 flex justify-between items-center">
                <span>{user.name}</span>
                <span className="text-xs font-mono bg-gray-600 text-green-300 rounded-full px-2 py-1">
                  {songs.filter(s => s.submittedBy === user.id).length} songs
                </span>
              </li>
            ))}
             {users.length === 0 && <p className="text-gray-400 text-sm">No players in the room yet.</p>}
          </ul>
        </div>

        {/* Song Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MusicNoteIcon className="w-7 h-7 text-green-400" />
            2. Add Songs
          </h2>
          <form onSubmit={handleAddSong} className="space-y-4">
            <select
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              disabled={users.length === 0}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition disabled:opacity-50"
            >
              <option value="" disabled>Select a player...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              placeholder="Paste Spotify track URL"
              disabled={users.length === 0}
              className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition disabled:opacity-50"
            />
            <button type="submit" disabled={users.length === 0} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              Add Song
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupSection;
