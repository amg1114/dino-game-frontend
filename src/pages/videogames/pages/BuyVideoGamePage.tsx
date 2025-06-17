import { Modal } from '@components/Modal';
import { useGamePageContext } from '@hooks/useGamePageContext';
import { CreditCard, MapPin, Tag } from 'lucide-react';
import { formatPrice } from '@utils/formatPrice';
import { useNavigate } from 'react-router';
import { useBuyVideoGame } from '../hooks/videogame/useBuyVideoGame';
import { StyledInput } from '@components/forms/StyledInput';

export function BuyVideoGamePage() {
  const navigate = useNavigate();
  const { game } = useGamePageContext();
  const { formData, errors, handleInputChange, handleSubmit } = useBuyVideoGame(game);

  const { activeDiscount, originalPrice, finalPrice, discountAmount } = formData;

  if (!game) {
    return (
      <Modal size="xl" modalTitle="Error" onClose={() => navigate(-1)}>
        <div className="py-8 text-center">
          <p className="text-red">No se pudo cargar la información del juego.</p>
        </div>
      </Modal>
    );
  }

  // Check if game is free
  if (game.precio === 0) {
    return (
      <Modal size="xl" modalTitle="Juego Gratuito" onClose={() => navigate(-1)}>
        <div className="space-y-4 py-8 text-center">
          <div className="bg-green mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Tag className="h-8 w-8" />
          </div>
          <h2 className="text-green">¡{game.titulo} es gratuito!</h2>
          <p className="text-white/80">Este juego no requiere compra. Puedes descargarlo directamente.</p>
          <button className="primary-button" onClick={() => handleSubmit()}>
            Descargar Gratis
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal size="7xl" modalTitle="Comprar Videojuego" onClose={() => navigate(-1)}>
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-4 gap-6">
            {/* Billing Address */}
            <div className="bg-placeholder col-span-3 rounded-lg p-6">
              <h3 className="mb-4 flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5" />
                Dirección de Facturación
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <StyledInput
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address ?? ''}
                  onChange={handleInputChange}
                  inputClassName="bg-placeholder-2"
                  placeholder="Calle Principal 123"
                  label="Dirección"
                  errors={errors.address}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <StyledInput
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city ?? ''}
                    onChange={handleInputChange}
                    inputClassName="bg-placeholder-2"
                    placeholder="Tuluá"
                    label="Ciudad"
                    errors={errors.city}
                  />

                  <StyledInput
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode ?? ''}
                    onChange={handleInputChange}
                    inputClassName="bg-placeholder-2"
                    placeholder="28001"
                    label="Código Postal"
                    errors={errors.zipCode}
                  />
                </div>
              </div>
            </div>
            {/* Payment Information */}
            <div className="bg-placeholder col-span-3 rounded-lg p-6">
              <h3 className="mb-4 flex items-center gap-2 text-white">
                <CreditCard className="h-5 w-5" />
                Información de Pago
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <StyledInput
                  label="Nombre en la Tarjeta"
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName ?? ''}
                  onChange={handleInputChange}
                  inputClassName="bg-placeholder-2"
                  placeholder="Juan Pérez García"
                  errors={errors.cardName}
                />

                <StyledInput
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber ?? ''}
                  onChange={handleInputChange}
                  inputClassName="bg-placeholder-2"
                  placeholder="1234 5678 9012 3456"
                  label="Número de Tarjeta"
                  errors={errors.cardNumber}
                />

                <div className="grid grid-cols-4 items-end gap-4">
                  <StyledInput
                    type="text"
                    id="expiryDateMonth"
                    name="expiryDateMonth"
                    value={formData.expiryDateMonth ?? ''}
                    onChange={handleInputChange}
                    inputClassName="bg-placeholder-2"
                    placeholder="MM"
                    label="Fecha de Expiración"
                    errors={errors.expiryDateMonth ?? ''}
                  />
                  <StyledInput
                    type="text"
                    id="expiryDateYear"
                    name="expiryDateYear"
                    value={formData.expiryDateYear ?? ''}
                    onChange={handleInputChange}
                    inputClassName="bg-placeholder-2"
                    placeholder="AA"
                    errors={errors.expiryDateYear ?? ''}
                  />
                  <StyledInput
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv ?? ''}
                    onChange={handleInputChange}
                    inputClassName="bg-placeholder-2"
                    className="col-span-2"
                    placeholder="123"
                    label="CVV"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-span-1 col-start-4 col-end-5 row-start-1 row-end-3 flex flex-col gap-4">
              <div className="bg-placeholder flex flex-1 flex-col rounded-lg p-6">
                <h3 className="mb-4 text-white">Resumen del Pedido</h3>
                <div className="space-y-2">
                  <figure className="aspect-video w-full overflow-hidden rounded">
                    <img src={game.thumb.url} alt={game.thumb.title} />
                  </figure>
                  <h3>{game.titulo}</h3>
                  <p>{game.descripcion}</p>
                  <ul className="flex flex-wrap gap-2">
                    {game.categorias.map((categoria) => (
                      <li key={categoria.id} className="thertiary-button thertiary-button--xs">
                        {categoria.titulo}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Subtotal:</span>
                    <span className="text-white">{formatPrice(originalPrice)}</span>
                  </div>
                  {activeDiscount && (
                    <div className="text-green flex justify-between">
                      <span>Descuento ({activeDiscount.porcentaje}%):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <hr className="border-placeholder-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-green">{formatPrice(finalPrice)}</span>
                  </div>
                </div>
              </div>

              <button type="submit" className="primary-button mt-auto w-full py-3 text-lg">
                Comprar por ${formatPrice(finalPrice)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
