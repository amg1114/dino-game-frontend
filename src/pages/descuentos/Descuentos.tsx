import { useParams } from 'react-router';
import { DescuentoList } from './components/DescuentoList';

export function Descuentos() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="">
      <DescuentoList id={slug || ''} />
    </div>
  );
}
