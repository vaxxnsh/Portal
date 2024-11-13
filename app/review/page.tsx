"use client";
import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import axios from 'axios';
import { main } from 'framer-motion/client';
import Header from '@/components/Nav';

const Home: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [textResult, setTextResult] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [responseReceived, setResponseReceived] = useState(false);

  const worker = createWorker();
  const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;

    try {
      (await worker).load();
      await (await worker).reinitialize('eng');
      await (await worker).reinitialize('eng');
      const { data } = await (await worker).recognize(selectedImage);
      setTextResult(data.text);
      
      if (!GEMINI_API_KEY || !GEMINI_API_URL) {
        console.error('Error: Missing Gemini API key or URL');
        return;
      }

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `I will give you text of a resume converted from an image. Evaluate it based on ATS score, skill relevance, and structure feedback. Format output as [78% | feedback]. Here is the text: ${data.text}`,
                },
              ],
            },
          ],
        }
      );

      setAnswer(response.data.candidates[0]?.content.parts[0]?.text || 'No response');
      setResponseReceived(true);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [selectedImage, worker, GEMINI_API_KEY, GEMINI_API_URL]);

  useEffect(() => {
    if (responseReceived) return;
    if (selectedImage) {
      convertImageToText();
    }

    return async () => {
      (await worker).terminate();
    };
  }, [selectedImage, convertImageToText, worker]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult('');
      setAnswer('');
    }
  };

  return (
    <main className='w-full h-screen'>
      <Header/>
          <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">ImText</h1>
      <p className="mb-6 text-gray-600">Extract words from images!</p>

      <div className="mb-4">
        <label
          htmlFor="upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          className="hidden"
          onChange={handleChangeImage}
        />
      </div>

      <div className="w-full flex flex-col items-center">
        {selectedImage && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-64 h-auto object-contain"
            />
          </div>
        )}

        {answer && (
          <div className="mt-4 bg-gray-100 p-4 rounded w-full max-w-md">
            <p className="text-gray-700 font-semibold">Generated Response:</p>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
    </main>
  );
};

export default Home;