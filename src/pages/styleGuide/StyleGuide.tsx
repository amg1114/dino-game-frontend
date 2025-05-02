import { Outlet } from 'react-router';

import logo from '../../assets/logo.svg';
import { HeroNoticia } from '../blog/components/HeroNoticia';
import { Pagination } from '../../components/pagination';
import { useState } from 'react';
import { useResponsiveItems } from '../../hooks/pagination/useItemsPerPage';
import { usePagination } from '../../hooks/pagination/usePagination';

const noticiasEjemplo = [
  { id: 1, title: 'Noticia 1' },
  { id: 2, title: 'Noticia 2' },
  { id: 3, title: 'Noticia 3' },
  { id: 4, title: 'Noticia 4' },
  { id: 5, title: 'Noticia 5' },
  { id: 6, title: 'Noticia 6' },
  { id: 7, title: 'Noticia 7' },
  { id: 8, title: 'Noticia 8' },
  { id: 9, title: 'Noticia 9' },
  { id: 10, title: 'Noticia 10' },
];

export function StyleGuidePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useResponsiveItems({ smallScreen: 4, largeScreen: 9 });
  const { paginatedData, totalPages } = usePagination(noticiasEjemplo, currentPage, itemsPerPage);

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

      <main className="bg-body h-screen py-9">
        <header className="border-b-placeholder container flex items-center justify-between border-b pb-2">
          <figure className="w-40">
            <img src={logo} alt="Dinogame" />
          </figure>
          <h2>Style guide</h2>
        </header>
        <div className="container">
          <h1>Dinogame works</h1>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero velit repellat explicabo aperiam cupiditate
            minus tempora natus alias deserunt commodi! Vel tempore sequi sapiente sint. Dicta distinctio aperiam,
            neque, <a href="#">facilis consequatur</a> quis tempore incidunt atque odio provident soluta suscipit. At
            eaque soluta fugit. Doloremque ducimus eum tenetur eaque perspiciatis alias?
          </p>
          <h2>Botónes</h2>
          <section className="space-y-6">
            <div className="flex items-end gap-4">
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

            <div className="flex items-end gap-4">
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

            <div className="flex items-end gap-4">
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
          <br />
          {/**<div>
            <NewsCard news={noticiasEjemplo}
            />
          </div> **/}
          <br />
          <div>
            <HeroNoticia
              title="Noticia destacada"
              image="https://preview.redd.it/vttjhicjlzfb1.jpg?auto=webp&s=c50aa80266d3593cae4e7f335d8879723f00bd11"
              description="Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum viverra, ex sit amet venenatis auctor, neque nibh lacinia dolor, id vulputate elit nisi quis lectus. Suspendisse quam augue, dapibus id convallis in, interdum vel ex. In tincidunt odio nec mi consequat efficitur. Integer bibendum diam at velit elementum porta. In velit lacus, aliquet sit amet lorem eu, venenatis commodo est. Donec leo sem, convallis a semper at, aliquet et purus"
              slug="noticia-destacada"
            />
          </div>

          <div>
            <div className="p-4">
              <h1 className="text-green mb-4 text-xl font-bold">Noticias</h1>

              {paginatedData.map((noticia: any) => (
                <div key={noticia.id} className="text-body mb-2">
                  {noticia.title}
                </div>
              ))}

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
