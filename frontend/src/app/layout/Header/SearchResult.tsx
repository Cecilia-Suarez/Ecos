import React from "react";

interface SearchResultsProps {
  songs: { id: string; title: string; audioUrl?: string }[];
  handlePlaySong: (url: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ songs, handlePlaySong }) => {
  return (
    <div className="fixed bottom-20 left-1/2 w-[300px] -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-md">
      {songs.length > 0 && (
        <div className="flex flex-col gap-2">
          {songs.map((song) => (
            <p
              key={song.id}
              className="cursor-pointer rounded px-2 py-1 text-black hover:bg-gray-200"
              onClick={() => song.audioUrl && handlePlaySong(song.audioUrl)}
            >
              {song.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
