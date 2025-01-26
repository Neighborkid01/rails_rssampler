import React from "react";

type NavRoute = {
  path: string;
  title: string;
};

interface NavProps {
  routes: NavRoute[]
}

const Nav = ({ routes }: NavProps) => {
  const route_links = routes.map(route => (
    <a className="p-4 text-xl" href={route.path}>
      {route.title}
    </a>
  ));

  return (
    <nav className="flex bg-slate-800 border-b-2 border-slate-600 sticky top-0 justify-between z-10">
      <section className="mx-4 my-2 flex items-center">
        <a className="text-3xl font-bold text-primary" href="/">RSSampler</a>
      </section>
      <section className="m-2 flex items-center">
        {route_links}
      </section>
    </nav>
  );
};

export default Nav;
