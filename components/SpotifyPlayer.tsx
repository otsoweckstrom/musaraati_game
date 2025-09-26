
import React from 'react';

interface SpotifyPlayerProps {
  trackId: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ trackId }) => {
  if (!trackId) return null;

  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <iframe
        style={{ borderRadius: '12px' }}
        src={embedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify Player for track ${trackId}`}
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
