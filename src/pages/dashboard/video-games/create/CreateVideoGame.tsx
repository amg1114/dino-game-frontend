import { useGameForm } from '../../hooks/useGameForm';
import { GameForm } from '../components/GameForm';

export function CreateVideoGame() {
  const formContext = useGameForm();

  return <GameForm formContext={formContext} />;
}
