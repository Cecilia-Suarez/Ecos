import { PlayIcon, PlusCircle, PauseIcon } from "@/home/components/ui/Icons";
import defaultImage from "@/assets/imagePlay.svg";
import { useState, useRef, useEffect } from "react";
import { SongList } from "./types/SongList";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { useAuth } from "@/auth/hooks/use-auth";
import { toast } from "sonner";

interface CardSongProps {
  song: SongList;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const CardSong = ({ song, isPlaying, onPlay, onPause }: CardSongProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const imageSrc = song.musicianInfo.photoUrl ?? defaultImage;
  const { title, genre, audioUrl } = song;
  const { stageName } = song.musicianInfo;
  const [duration, setDuration] = useState<string>("");
  const { user } = useAuth();

  const saveFavoriteMutation = useApiMutation(`/saved-songs/save/${String(song.id)}`, "POST");

  const handleSaveFavorite = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    if (user.role !== "FAN") {
      toast.error("Solo los fans pueden guardar canciones favoritas.");
      return;
    }

    saveFavoriteMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Canción guardada en favoritos.");
      },
      onError: () => toast.error("No se pudo guardar la canción."),
    });
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      if (audio) {
        const totalSeconds = Math.floor(audio.duration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formatted = `${String(minutes)}:${seconds < 10 ? "0" : ""}${String(seconds)}`;
        setDuration(formatted);
      }
    };

    if (audio) {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.load();
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <>
      <div className="flex h-[9.563rem] w-[22.75rem] items-center gap-[1.188rem] pt-3.5 pb-[1.188rem] pl-2 md:w-[39.625rem] lg:h-[7.5rem]">
        <img
          src={imageSrc}
          alt={stageName}
          className="roundend-[1.25rem] aspect-square h-[7.5rem] w-[7.5rem]"
        />
        <div className="flex h-28 w-full flex-col justify-center gap-1 text-start">
          <h3 className="text-ecos-blue text-[1.375rem]">{title}</h3>

          <span className="text-sm text-[#49454f]">
            Artista: {stageName} / Género: {genre}{" "}
          </span>

          <div className="flex justify-between">
            <div className="flex items-center gap-1 text-xs text-[#49454f]">
              <button
                type="button"
                className="flex items-center gap-1"
                onClick={handleSaveFavorite}
              >
                <PlusCircle className="text-ecos-blue h-6" />
                <span>Me gusta</span>
              </button>
              <span>•</span>
              <span>{duration} min</span>
            </div>
            <button
              type="button"
              onClick={handlePlayPause}
              className="text-ecos-blue h-[2.375rem] w-10"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} hidden />
    </>
  );
};

export default CardSong;
