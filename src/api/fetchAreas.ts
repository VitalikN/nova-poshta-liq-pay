const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error("API base URL or API key is not defined");
}
export interface Area {
  Description: string;
}

export async function fetchAreas(): Promise<Area[]> {
  try {
    const response = await fetch(baseUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getAreas",
        methodProperties: {},
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success) {
      return data.data as Area[];
    } else {
      console.error("API response was not successful:", data);
      return [];
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}

fetchAreas();
