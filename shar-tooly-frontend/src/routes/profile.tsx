import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  GetAllUsers,
  GetBorrowedToolsByUserId,
  GetOwnedToolsByUserId,
  User,
} from "../UserFetchUtils";
import { useAuth } from "../Components/AuthProvider";
import { DeleteTool, returnTool } from "../ToolFetchUtils";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const notifyDelete = () => {
  toast.success("You successfully deleted a tool!"),
    {
      duration: 2000,
    };
};

const notifyLoginError = () => {
  toast.error("Invalid credentials!"),
    {
      duration: 1000,
    };
};
const notifyReturn = () => toast.success("You returned a tool!");

const notifyLoginSuccess = () =>
  toast.success("You have successfully logged in!");

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

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["deleteTool"],
    mutationFn: DeleteTool,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["toolsowned"] });
    },
  });

  const { mutate: returnMutate } = useMutation({
    mutationKey: ["returnTool"],
    mutationFn: returnTool,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["toolsborrowed"] });
    },
  });

  const { data: userOwnedTools, refetch: refetchOwnedTools } = useQuery({
    queryKey: ["toolsowned", currentUserId],
    queryFn: () => GetOwnedToolsByUserId(currentUserId),
    enabled: !!currentUserId,
  });

  const { data: userBorrowedTools, refetch: refetchBorrowedTools } = useQuery({
    queryKey: ["toolsborrowed", currentUserId],
    queryFn: () => GetBorrowedToolsByUserId(currentUserId),
    enabled: !!currentUserId,
  });

  async function handleDelete(toolId: string) {
    deleteMutate(toolId);
    notifyDelete();
  }

  async function handleReturn(toolId: string) {
    returnMutate(toolId);
    notifyReturn();
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userId = data!.find(
      (user: User) => user.username == username && user.password == password
    )?.id;

    if (isFetched && data) {
      if (
        data!.some(
          (user: User) => user.username == username && user.password == password
        )
      ) {
        login(userId!);
        notifyLoginSuccess();
      } else {
        notifyLoginError();
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn && currentUserId) {
      refetchOwnedTools();
      refetchBorrowedTools();
    }
  }, [currentUserId, isLoggedIn, refetchOwnedTools, refetchBorrowedTools]);

  return (
    <div className="flex flex-col mx-auto items-center justify-center w-3/4">
      <Toaster />
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
            <button
              className=" btn btn-secondary"
              type="submit">
              Login
            </button>
          </form>
        </div>
      )}
      {
        //one table of tools for the logged in user
        //One table of tools that this user has lent
      }
      {isLoggedIn && (
        <div className="flex flex-col gap-10">
          <h2 className="text-4xl font-bold">My tools</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Model</th>
              </tr>
            </thead>

            <tbody>
              {userOwnedTools &&
                userOwnedTools.map((tool) => (
                  <tr key={tool.id}>
                    <td>
                      <img
                        className="object-contain size-20"
                        src={`/localBlob/${tool.imageName}`}
                        alt="No picture available"
                      />
                    </td>
                    <td>{tool.name}</td>
                    <td>{tool.description}</td>
                    <td>{tool.model}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(tool.id as string)}
                        className="btn btn-error">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2 className="text-4xl font-bold">Currently Borrowed Tools</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Model</th>
              </tr>
            </thead>

            <tbody>
              {userBorrowedTools &&
                userBorrowedTools.map((tool) => (
                  <tr key={tool.id}>
                    <td>
                      <img
                        className="object-contain size-20"
                        src={`/localBlob/${tool.imageName}`}
                        alt="No picture available"
                      />
                    </td>
                    <td>{tool.name}</td>
                    <td>{tool.description}</td>
                    <td>{tool.model}</td>
                    <td>
                      <button
                        onClick={() => handleReturn(tool.id as string)}
                        className="btn btn-error">
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
