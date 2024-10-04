# Bagel Recipe Generator and Fine-Tuning Application

## Overview
This application is a Bagel Recipe Generator that uses the LLaMA3 model for generating recipes and allows users to create custom datasets for fine-tuning the model. It's built with a React/Next.js frontend and a Flask backend, integrating with the Bagel API for AI functionalities.

## Features
- Generate bagel recipes based on user inspiration
- Create custom datasets by uploading files (JSON, CSV, TXT)
- Fine-tune the LLaMA3 model using custom datasets
- User authentication

## Tech Stack
- Frontend: React, Next.js, TypeScript
- Backend: Flask (Python)
- AI Integration: Bagel API (bagelML)
- Authentication: NextAuth.js

## Prerequisites
- Node.js and npm
- Python 3.8+
- Bagel API key

## Setup

### Backend Setup
1. Navigate to the backend directory:
cd server
Copy
2. Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate

3. Install dependencies:
pip install flask flask-cors bagelML

4. Set up environment variables:
Create a `.env` file in the backend directory with:
BAGEL_API_KEY=your_bagel_api_key_here
LLAMA3_MODEL_ID=your_llama3_model_id_here

5. Run the Flask server:
python app.py

### Frontend Setup
1. Navigate to the frontend directory:
cd ../client

2. Install dependencies:
npm install

3. Set up environment variables:
Create a `.env.local` file in the frontend directory with:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

4. Run the development server:
npm run dev

## Usage

1. **Generate a Recipe**:
- Enter an inspiration in the text field
- Click "Generate Recipe"
- The AI-generated recipe will be displayed

2. **Create a Dataset**:
- Enter a dataset name
- Upload a file (JSON, CSV, or TXT format)
- Click "Create Dataset"
- The new dataset will be created and ready for fine-tuning

3. **Fine-tune the Model**:
- After creating a dataset, click "Fine-tune Model"
- The fine-tuning process will begin using the created dataset

## API Endpoints

- `POST /api/generate-recipe`: Generate a bagel recipe
- `POST /api/create-dataset`: Create a new dataset
- `POST /api/fine-tune`: Initiate fine-tuning of the model

## Troubleshooting

If you encounter issues:
1. Ensure all environment variables are correctly set
2. Check that the Bagel API key and LLaMA3 model ID are valid
3. Verify that the bagelML library is up to date
4. Check the console logs (both frontend and backend) for error messages