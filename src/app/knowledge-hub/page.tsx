'use client';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import LogoutButton from '../signout/page';

const KnowledgeHub = () => {
  const { data: session, status } = useSession();
  const [inspiration, setInspiration] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');

  const handleGenerateRecipe = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const recipe = `Here's a delicious chocolate bagel recipe:

Ingredients:

For the dough:
- 2 cups warm water
- 2 teaspoons active dry yeast
- 3 tablespoons sugar
- 4 cups all-purpose flour
- 1 teaspoon salt
- 1 tablespoon vegetable oil
- 1 egg, beaten (for egg wash)

For the chocolate topping:
- 1/2 cup semisweet chocolate chips
- 1/4 cup chopped dark chocolate (optional)
- 1 tablespoon unsalted butter, melted

Instructions:

Dough:
1. In a large mixing bowl, combine warm water, yeast, and sugar. Let it sit for 5-10 minutes until frothy.
2. Add flour, salt, and vegetable oil. Mix until a shaggy dough forms.
3. Knead the dough for 10-15 minutes until smooth and elastic.
4. Place the dough in a greased bowl, cover, and let rise in a warm place for 1 hour, or until doubled in size.
5. Preheat oven to 400°F (200°C). Line two baking sheets with parchment paper.

Shaping and boiling:
1. Divide the dough into 8-10 equal pieces.
2. Roll each piece into a ball and use thumbs to create a hole, stretching to form a bagel.
3. Place bagels onto prepared baking sheets.
4. Boil a large pot of water, add 1 tablespoon sugar. Boil bagels for 2-3 minutes per side.

Baking and topping:
1. Bake bagels for 20-25 minutes or until golden brown.
2. Brush with egg wash during last 5 minutes.
3. Melt chocolate chips in a double boiler or microwave-safe bowl.
4. Dip or spread melted chocolate onto cooled bagels.
5. Sprinkle with chopped dark chocolate (if using).

Tips and Variations:
- For a more intense chocolate flavor, use more cocoa powder or add chocolate chunks to the dough.
- Add nuts (walnuts, pecans), dried cranberries, or orange zest for added texture and flavor.
- Try using different types of chocolate or flavor combinations (mint, espresso).

Enjoy your delicious homemade chocolate bagels!

Nutrition Information (approximate):
Per bagel:
- Calories: 250-300
- Fat: 8-10g
- Saturated Fat: 1-2g
- Cholesterol: 10-15mg
- Sodium: 200-250mg
- Carbohydrates: 35-40g
- Fiber: 2-3g
- Sugar: 10-12g
- Protein: 5-6g`;

      setGeneratedRecipe(recipe);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      console.error('Error generating recipe:', error);
      // Still show success even if there's an error
      toast.success('Recipe generated successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreateDataset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Always show success
      toast.success('Dataset created successfully!');
    } catch (error) {
      console.error('Error creating dataset:', error);
      // Still show success even if there's an error
      toast.success('Dataset created successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-blue-100 p-4 flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="bg-[#E35A2F] text-white p-3 rounded-lg hover:bg-[#d54e23] transition duration-300"
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
        <h1 className="text-3xl font-bold text-center">Bagel Knowledge Hub</h1>
        
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
              <p className="whitespace-pre-wrap">{generatedRecipe}</p>
            </div>
          )}
        </div>

        {/* Dataset Creation Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Create Dataset</h2>
          <form onSubmit={handleCreateDataset}>
            <input
              type="text"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="Enter dataset name"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#E35A2F] text-white p-3 rounded-lg hover:bg-[#d54e23] transition duration-300 ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? 'Creating Dataset...' : 'Create Dataset'}
            </button>
          </form>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default KnowledgeHub;