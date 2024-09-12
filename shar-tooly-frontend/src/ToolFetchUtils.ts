export type Tool = {
  id?: string;
  model: string;
  name: string;
  description: string;
  imageName: string;
  isAvailable: boolean;
};

export async function GetTools() {
  try {
    const response: Response = await fetch("http://localhost:5294/Tools");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool[] = await response.json();

    return data as Tool[];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function GetFilteredTools(searchTerm: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools/search?query=" + searchTerm
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

export async function PostTool(formData: FormData, userId: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools?userId=" + userId,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool = await response.json();

    return data as Tool;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function BorrowTool(id: string, userId: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools/" + id + "?userId=" + userId,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool = await response.json();

    return data as Tool;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function DeleteTool(id: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools/" + id,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool = await response.json();

    return data as Tool;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function returnTool(id: string) {
  try {
    const response: Response = await fetch(
      "http://localhost:5294/Tools/return/" + id,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool = await response.json();

    return data as Tool;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
