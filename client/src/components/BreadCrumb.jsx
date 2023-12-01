import React from "react";
import { Link, NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    {
      path: "/:category/:pid/:title",
      breadcrumb: title,
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="flex items-center gap-2">
      {breadcrumbs
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, idx) => (
          <Link className="text-sm hover:text-main cursor-pointer" key={match.pathname} to={match.pathname}>
            {idx !== 0 && ">"} <span className="capitalize">{breadcrumb}</span>
          </Link>
        ))}
    </div>
  );
};
export default BreadCrumb;
