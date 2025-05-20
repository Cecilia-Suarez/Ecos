import { useRef, useState } from "react";
import { SongList } from "./types/SongList";
import CardSong from "./CardSong";
import { ArrowScroll } from "./ui/ArrowScroll";

interface SongsGridProps {
  songs: SongList[];
}

const SongsGrid = ({ songs }: SongsGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    const amount = direction === "right" ? 600 : -600;
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={containerRef} className="no-scrollbar flex overflow-x-auto">
        <div className="grid flex-shrink-0 grid-cols-3 space-x-24">
          {songs.map((song) => (
            <CardSong
              key={song.id}
              song={song}
              isPlaying={playingId === String(song.id)}
              onPlay={() => {
                setPlayingId(String(song.id));
              }}
              onPause={() => {
                setPlayingId(null);
              }}
            />
          ))}
        </div>
      </div>

      <button
        title="arrowscroll"
        type="button"
        onClick={() => {
          scroll("left");
        }}
        className="bg-ecos-orange absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2.5 shadow-md"
      >
        <ArrowScroll className="rotate-180" />
      </button>

      <button
        title="arrowscroll"
        type="button"
        onClick={() => {
          scroll("right");
        }}
        className="bg-ecos-orange absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2.5 shadow-md"
      >
        <ArrowScroll />
      </button>
    </div>
  );
};

export default SongsGrid;
