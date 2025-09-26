
export interface User {
  id: number;
  name: string;
}

export interface Song {
  id: number;
  trackId: string;
  submittedBy: User['id'];
}

export interface CurrentSong extends Song {
  submitterName: string;
}
