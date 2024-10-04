'use client';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { generateRecipe, createDataset, fineTuneModel } from '@/utils/bagelClient';
import { signIn } from 'next-auth/react';
import LogoutButton from '../signout/page';

const KnowledgeHub = () => {
  const { data: session, status } = useSession();
  const [inspiration, setInspiration] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [isCreatingDataset, setIsCreatingDataset] = useState(false);
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [datasetAssetId, setDatasetAssetId] = useState('');

  const handleGenerateRecipe = async () => {
    setIsSubmitting(true);
    try {
      const recipe = await generateRecipe(inspiration);
      setGeneratedRecipe(recipe);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateDataset = async () => {
    if (!file || !datasetName) {
      toast.error('Please select a file and enter a dataset name');
      return;
    }
    setIsCreatingDataset(true);
    try {
      const assetId = await createDataset(session!.user!.id, file, datasetName);
      setDatasetAssetId(assetId);
      toast.success('Dataset created successfully!');
    } catch (error) {
      console.error('Error creating dataset:', error);
      toast.error('Failed to create dataset. Please try again.');
    } finally {
      setIsCreatingDataset(false);
    }
  };

  const handleFineTune = async () => {
    if (!datasetAssetId) {
      toast.error('Please create a dataset first');
      return;
    }
    setIsFineTuning(true);
    try {
      const result = await fineTuneModel(datasetAssetId, session!.user!.id);
      toast.success('Model fine-tuning started successfully!');
      console.log('Fine-tuning result:', result);
    } catch (error) {
      console.error('Error fine-tuning model:', error);
      toast.error('Failed to start fine-tuning. Please try again.');
    } finally {
      setIsFineTuning(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-blue-100 p-4 flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign in to use Bagel Knowledge Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <ToastContainer />
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Bagel Recipe Generator</h1>
        
        {/* Recipe Generation Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Generate Recipe</h2>
          <textarea
            value={inspiration}
            onChange={(e) => setInspiration(e.target.value)}
            placeholder="Enter your bagel recipe inspiration"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            rows={4}
          />
          <button
            onClick={handleGenerateRecipe}
            disabled={isSubmitting}
            className={`w-full bg-[#E35A2F] text-white p-3 rounded-lg hover:bg-[#d54e23] transition duration-300 ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? 'Generating Recipe...' : 'Generate Recipe'}
          </button>
          {generatedRecipe && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold">Generated Recipe:</h3>
              <p>{generatedRecipe}</p>
            </div>
          )}
        </div>

        {/* Dataset Creation Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Create Dataset</h2>
          <input
            type="text"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="Enter dataset name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            accept=".json,.csv,.txt"
          />
          <button
            onClick={handleCreateDataset}
            disabled={isCreatingDataset}
            className={`w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 ${isCreatingDataset ? 'opacity-50' : ''}`}
          >
            {isCreatingDataset ? 'Creating Dataset...' : 'Create Dataset'}
          </button>
        </div>

        {/* Fine-tuning Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Fine-tune Model</h2>
          <button
            onClick={handleFineTune}
            disabled={isFineTuning || !datasetAssetId}
            className={`w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${(isFineTuning || !datasetAssetId) ? 'opacity-50' : ''}`}
          >
            {isFineTuning ? 'Fine-tuning Model...' : 'Fine-tune Model'}
          </button>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default KnowledgeHub;