import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
console.log('Gemini API Key loaded:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');

if (!apiKey) {
  console.error('REACT_APP_GEMINI_API_KEY is not defined in .env file');
}

const geminiai = new GoogleGenerativeAI({
  apiKey: apiKey,
});

// Test the API key validity
export const testGeminiAPI = async () => {
  try {
    const model = geminiai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // eslint-disable-next-line no-unused-vars
    const result = await model.generateContent('test');
    console.log('Gemini API Key is VALID');
    return true;
  } catch (error) {
    console.error('Gemini API Key is INVALID:', error.message);
    return false;
  }
};

export default geminiai;