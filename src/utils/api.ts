export const createAsset = async (title: string, category: string, details: string, tags: string[], apiKey: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_API_URL}/create-asset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        title,
        category,
        details,
        tags,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create asset');
    }
  
    return await response.json();
  };
  