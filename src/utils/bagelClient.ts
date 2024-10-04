const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const generateRecipe = async (inspiration: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspiration })
    });
    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};

export const createDataset = async (userId: string, file: File, datasetName: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    formData.append('datasetName', datasetName);

    const response = await fetch(`${API_BASE_URL}/api/create-dataset`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create dataset');
    }
    
    const data = await response.json();
    return data.assetId;
  } catch (error) {
    console.error("Error creating dataset:", error);
    throw error;
  }
};

export const fineTuneModel = async (assetId: string, userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/fine-tune`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId, userId })
    });
    return await response.json();
  } catch (error) {
    console.error("Error in fineTuneModel:", error);
    throw error;
  }
};