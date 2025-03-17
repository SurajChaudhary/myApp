// Ensure this file contains the fetchLLMResponse function implementation
// and export it properly.

export const fetchLLMResponse = async (
    endpoint: string,
    apiKey: string,
    payload: { prompt: string; model?: string; currentContext?: string; relatedContext?: string }
  ): Promise<string> => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.result || "";
    } catch (error) {
      console.error("Error in fetchLLMResponse:", error);
      throw error;
    }
  };