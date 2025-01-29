// pages/api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { message } = req.body;
      
      // Here you would typically:
      // 1. Process the message
      // 2. Generate or fetch a response
      // 3. Return the response
      
      // This is a simple example response
      const response = {
        content: `You said: ${message}. This is a mock response from the API.`
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error('Chat API Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }