import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log('OpenAI API Key loaded:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');

if (!apiKey) {
  console.error('❌ REACT_APP_OPENAI_API_KEY is not defined in .env file');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

// Test the API key validity
export const testOpenAIAPI = async () => {
  try {
    await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 5,
    });
    console.log('✅ OpenAI API Key is VALID');
    return true;
  } catch (error) {
    console.error('❌ OpenAI API Key is INVALID:', error.message);
    return false;
  }
};

export default openai;
