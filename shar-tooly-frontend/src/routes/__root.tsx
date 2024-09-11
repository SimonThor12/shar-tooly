import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { useAuth } from "../Components/AuthProvider";

const activeProps = {
  style: {
    fontWeight: "bold",
  },
};

export const Route = createRootRoute({
  component: () => Root(),
});

function Root() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      <nav className="font-bold bg-secondary">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
                <li>
                  <Link
                    to="/uploadform"
                    activeProps={activeProps}>
                    Share Tool
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Link
              to="/"
              className="text-4xl">
              Shar-Tooly
            </Link>
          </div>
          <div className="navbar-end">
            <Link
              to="/profile"
              activeProps={activeProps}
              className="btn btn-secondary">
              Profile
            </Link>
            {isLoggedIn && (
              <Link
                to="/profile"
                activeProps={activeProps}
                className="btn btn-secondary"
                onClick={logout}>
                Log Out
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
