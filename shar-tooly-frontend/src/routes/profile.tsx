import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GetAllUsers, GetOwnedToolsByUserId, User } from "../UserFetchUtils";
import { useAuth } from "../Components/AuthProvider";
import { DeleteTool } from "../ToolFetchUtils";
import { useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: () => Profile(),
});

function Profile() {
  const { isLoggedIn, login, currentUserId } = useAuth();
  const clientQuery = useQueryClient();

  const { data, isFetched } = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUsers,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteTool"],
    mutationFn: DeleteTool,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["tools"] });
    },
  });
  const { data: userOwnedTools, refetch: refetchTools } = useQuery({
    queryKey: ["tools", currentUserId],
    queryFn: () => GetOwnedToolsByUserId(currentUserId),
    enabled: !!currentUserId,
  });

  async function handleDelete(toolId: string) {
    mutate(toolId);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userId = data!.find(
      (user: User) => user.username == username && user.password == password
    )?.id;

    if (isFetched && data) {
      if (
        data!.some(
          (user: User) =>
            user.username === username && user.password === password
        )
      ) {
        login(userId!);
      } else {
        alert("Invalid credentials");
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn && currentUserId) {
      refetchTools();
    }
  }, [currentUserId, isLoggedIn, refetchTools]);

  return (
    <div className="flex flex-col mx-auto items-center justify-center w-3/4">
      {!isLoggedIn && (
        <div className="mt-10">
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
      {
        //one list of tools for the logged in user
        //One list of tools that this user has lent
      }
      {isLoggedIn && (
        <div>
          <h2>My tools</h2>
          <ul>
            {userOwnedTools &&
              userOwnedTools?.map((tool) => (
                <li key={tool.id}>
                  <p>{tool.name}</p>
                  <p>{tool.description}</p>
                  <p>{tool.model}</p>
                  <button onClick={() => handleDelete(tool.id!)}>Delete</button>
                </li>
              ))}
          </ul>
          <ul>
            <h2>Tools I have lent</h2>
            <li>
              <p>Tool 1</p>
              <p>Tool 1 description</p>
              <p>Tool 1 model</p>
            </li>
            <li>
              <p>Tool 2</p>
              <p>Tool 2 description</p>
              <p>Tool 2 model</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
