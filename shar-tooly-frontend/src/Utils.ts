export type Tool = {
  model: string;
  name: string;
  description: string;
  imageUrl: string;
};
export async function GetTools() {
  try {
    const response: Response = await fetch("http://localhost:5294/Tools");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool[] = await response.json();

    console.log(data);
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


export async function PostTool(PostTool: Tool) {
  try {
    const response: Response = await fetch("http://localhost:5294/Tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(PostTool),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool = await response.json();

    console.log(data);
    return data as Tool;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}