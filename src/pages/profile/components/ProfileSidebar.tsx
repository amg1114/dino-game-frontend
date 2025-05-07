import React from 'react';
import { UserType, Usuario } from '../../../models/user.interface';
import { Link, useLocation } from 'react-router';

export interface ProfileRoute {
  title: string;
  path: string;
  icon: React.ReactNode;
  access: UserType[];
  placeAtEnd?: true;
}

export function ProfileSidebar({ routes, usuario }: { routes: ProfileRoute[]; usuario: Usuario }) {
  const location = useLocation();
  return (
    <nav className="flex flex-col max-md:w-full">
      <ul className="flex flex-1 flex-col gap-6">
        {routes.map(
          (route, index) =>
            usuario &&
            route.access.includes(usuario.tipo) && (
              <li
                className={`${
                  location.pathname === route.path ? 'border-l-green text-green' : 'border-l-transparent text-white'
                } flex items-center gap-2 border-l-2 pl-2 text-xl ${route.placeAtEnd ? 'mt-auto' : ''} `}
                key={index + route.path}
              >
                <span className="text-green text-2xl">{route.icon}</span>
                <Link to={route.path} className="font-bebas hover:text-green text-inherit uppercase no-underline">
                  {route.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
