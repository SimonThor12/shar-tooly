import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GetAllUsers, User } from "../UserFetchUtils";

export const Route = createFileRoute("/profile")({
  component: () => Profile(),
});

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUsers,
  });

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (isFetched && data) {
      if (
        data!.some(
          (user: User) =>
            user.username === username && user.password === password
        )
      ) {
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    }
  }
  return (
    <>
      {!isLoggedIn && (
        <div className="mt-10 w-full flex justify-center items-center">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleLogin}>
            <label className="input input-bordered flex items-center gap-2">
              Username
              <input
                name="username"
                type="text"
                placeholder="user1"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Password
              <input
                name="password"
                type="password"
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <h1>Profile</h1>
        </div>
      )}
    </>
  );
}
