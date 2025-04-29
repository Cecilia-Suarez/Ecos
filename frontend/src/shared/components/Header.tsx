interface HeaderProps {
  onOpenModal: () => void;
  onOpenLogin: () => void;
}

export const Header = ({ onOpenModal, onOpenLogin }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-around bg-[#B1B1B1] p-4 shadow">
      <button type="button" onClick={onOpenLogin}>
        Iniciar Sesión
      </button>
      <button type="button" onClick={onOpenModal}>
        Crear cuenta
      </button>
    </header>
  );
};
