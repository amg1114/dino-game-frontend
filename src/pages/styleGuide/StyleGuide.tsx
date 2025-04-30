import { Outlet } from 'react-router';

export function StyleGuidePage() {
  return (
    <>
      <h1>Dinogame works</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero velit repellat explicabo aperiam cupiditate minus
        tempora natus alias deserunt commodi! Vel tempore sequi sapiente sint. Dicta distinctio aperiam, neque,{' '}
        <a href="#">facilis consequatur</a> quis tempore incidunt atque odio provident soluta suscipit. At eaque soluta
        fugit. Doloremque ducimus eum tenetur eaque perspiciatis alias?
      </p>
      <h2>Botónes</h2>
      <section className="space-y-6">
        <div className="flex flex-wrap items-end gap-4">
          <button type="button" className="primary-button">
            Primary button
          </button>
          <button type="button" className="primary-button primary-button--sm">
            Primary sm button
          </button>
          <button type="button" className="primary-button primary-button--xs">
            Primary xs button
          </button>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <button type="button" className="secondary-button">
            Secondary button
          </button>
          <button type="button" className="secondary-button secondary-button--sm">
            Secondary sm button
          </button>
          <button type="button" className="secondary-button secondary-button--xs">
            Secondary xs button
          </button>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <button type="button" className="thertiary-button">
            Thertiary button
          </button>
          <button type="button" className="thertiary-button thertiary-button--sm">
            Thertiary sm button
          </button>
          <button type="button" className="thertiary-button thertiary-button--xs">
            Thertiary xs button
          </button>
        </div>
      </section>

      <Outlet />
    </>
  );
}
