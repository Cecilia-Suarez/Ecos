import Input from "@/app/ui/Input";
import MenuIcon from "@/app/ui/MenuIcon";
import Lens from "@/app/ui/LensIcon";

const MusicSearch = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-8">
      <h1 className="subtitles">Encuentra tu artista favorito</h1>
      <Input
        placeholder="Busca Artista, Album, Canción"
        startIcon={<MenuIcon />}
        endIcon={<Lens />}
      />
    </section>
  );
};

export default MusicSearch;
