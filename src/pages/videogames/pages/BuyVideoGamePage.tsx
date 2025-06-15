import { Modal } from '@components/Modal';
import { useGamePageContext } from '@hooks/useGamePageContext';

export function BuyVideoGamePage() {
  const { game } = useGamePageContext();
  return (
    <Modal size="xl" modalTitle="Comprar Videojuego">
      <h1>Comprar Videojuego: {game?.titulo}</h1>
      <p>Esta página te permitirá comprar un videojuego.</p>
      <p>Próximamente disponible.</p>
    </Modal>
  );
}
