import { useParams } from 'react-router';
import { useEditGame } from '../../hooks/useEditGame';
import { GameForm } from '../components/GameForm';

export function EditVideoGame() {
  const { slug } = useParams<{ slug: string }>();
  const { editForm, fetchedGame: videoGame } = useEditGame(slug || '');

  return (
    <>
      {videoGame && (
        <>
          <GameForm formContext={editForm} />
        </>
      )}
    </>
  );
}
