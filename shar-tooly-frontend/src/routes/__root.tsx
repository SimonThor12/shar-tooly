import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

const activeProps = {
  style: {
    fontWeight: "bold",
  },
};

export const Route = createRootRoute({
  component: () => (
    <>
      <ul
        data-theme="shartooly"
        className="p-4 text-4xl flex justify-evenly shadow-xl">
        <li>
          <Link
            to="/"
            activeProps={activeProps}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            activeProps={activeProps}>
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            activeProps={activeProps}>
            Profile
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  ),
});
