import React from "react";
import Form from "./form";

type NavRoute = {
  path: string;
  title: string;
  method?: "delete";
};

interface NavProps {
  routes: NavRoute[]
}

const GetRoute: React.FC<{ route: NavRoute }> = ({ route }) => {
  return (
    <a key={route.title} className="p-4 text-xl" href={route.path}>
      {route.title}
    </a>
  );
};

const DeleteRoute: React.FC<{ route: NavRoute }> = ({ route }) => {
  return (
    <Form action={route.path} method="DELETE" useAjax={false}>
      <input className="p-4 text-xl" type="submit" value={route.title} />
    </Form>
  );
};

const Nav = ({ routes }: NavProps) => {
  const route_links = routes.map(route => (
    route.method === "delete"
      ? <DeleteRoute key={route.title} route={route} />
      : <GetRoute key={route.title} route={route} />
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
