import { Tool } from "./ToolFetchUtils";

export type User = {
  id: string;
  username: string;
  password: string;
};

export async function GetAllUsers() {
  try {
    const response: Response = await fetch("http://localhost:5294/User");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: User[] = await response.json();

    return data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function GetOwnedToolsByUserId(userId: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools/user/" + userId
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool[] = await response.json();

    return data as Tool[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
