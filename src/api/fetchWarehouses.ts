export interface Warehouse {
  Description: string;
  Number: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error("API base URL or API key is not defined");
}

export async function fetchWarehouses(cityName: string): Promise<Warehouse[]> {
  try {
    const response = await fetch(baseUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: cityName,
          Page: "1",
          Limit: "50",
          Language: "UA",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.error("API response was not successful:", data);
      console.error("Errors:", data.errors);
      return [];
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}
