export function DescuentoColumnHeaders() {
  return (
    <div className="grid grid-cols-6 items-start gap-3 text-center">
      <h3 className="text-start text-2xl md:text-lg lg:text-2xl">Fecha inicio</h3>
      <h3 className="text-start text-2xl md:text-lg lg:text-2xl">Fecha final</h3>
      <h3 className="text-2xl md:text-lg lg:text-2xl">porcentaje</h3>
      <h3 className="text-2xl md:text-lg lg:text-2xl">valor inicial</h3>
      <h3 className="text-2xl md:text-lg lg:text-2xl">valor final</h3>
    </div>
  );
}
