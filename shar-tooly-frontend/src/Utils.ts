export type Tool = {
  id: string;
  model: string;
  name: string;
  description: string;
  url: string;
};
export async function GetTools() {
  try {
    const response: Response = await fetch("http://localhost:5294/Tools");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Tool[] = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
