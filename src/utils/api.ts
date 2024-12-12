const BASE_URL = import.meta.env.VITE_BASE_URL

console.log(import.meta.env.VITE_BASE_URL); // Correct

export const fetchData = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(BASE_URL)

    console.log(`${BASE_URL}${endpoint}`)
    console.error('API Fetch Error:', error);
    throw error;
  }
};
