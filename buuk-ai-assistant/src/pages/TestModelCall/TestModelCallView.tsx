import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, CircularProgress } from '@mui/material';

const TestModelCallView = () => {
    const [inputText, setInputText] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
    };
  
    const handleSubmit = async () => {
      if (!inputText.trim()) return; // Don't submit if input is empty
      setLoading(true);
      setError(null);
      setResponse(null);
  
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5NTUyZGQzLTllY2QtNGRiYy1hNGExLTg1ZDVhYzJkZWE1YiJ9.RD5N9-fWhRIETQmbEBkRSh80f8-46q4KRwK8uKNlLnw'; // Use your actual API key or environment variable
      const url = 'https://server01.hackathonservices.co.uk/api/chat/completions'; 
  
      try {
        const res = await axios.post(
          url,
          {
            title: "Qwen2.5-Coder",
            model: 'qwen2.5-coder:32b-instruct-q4_K_M', // Replace with the actual model name you are using
            provider: "ollama",
            messages: [
              {
                role: 'user',
                content: inputText,
              },
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json', // Make sure the Content-Type is set
            },
          }
        );
  
        // Assuming the response contains an 'answer' or 'choices' field
        setResponse(res.data.choices[0]?.message?.content || 'No response from model');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error fetching data from OpenWebUI server');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-md w-full space-y-4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center">Ask OpenWebUI Model</h2>
  
          <TextField
            label="Input Text"
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={handleInputChange}
          />
  
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
  
          {error && <div className="text-red-500 text-center">{error}</div>}
  
          {response && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner mt-4">
              <h3 className="font-semibold">Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
 
export default TestModelCallView;