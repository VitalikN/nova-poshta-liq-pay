import { useEffect, useState } from "react";

export interface City {
  Description: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error("API base URL or API key is not defined");
}

export async function fetchCities(findByString: string): Promise<City[]> {
  try {
    const response = await fetch(baseUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: findByString,
          Page: "1",
          Limit: "20",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("API Response:", data); // Додайте це для перевірки відповіді API

    if (data.success) {
      return data.data as City[];
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
