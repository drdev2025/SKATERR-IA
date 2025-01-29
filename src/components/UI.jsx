import React, { useRef, useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const UI = ({ hidden, ...props }) => {
  const input = useRef(null);
  const messagesEndRef = useRef(null);

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [cameraZoomed, setCameraZoomed] = useState(false);
  
  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;
  
    setIsLoading(true);
  
    try {
      setChatMessages(prev => [...prev, { role: "user", content: trimmedInput }]);
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: trimmedInput }],
        model: "gpt-3.5-turbo",
      });

      const responseMessage = completion.choices[0].message.content;
  
      setChatMessages(prev => [...prev, { role: "assistant", content: responseMessage }]);
  
      setUserInput("");
      scrollToBottom();
  
    } catch (error) {
      console.error("OpenAI Error:", error);
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleGreenScreen = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("greenScreen");
  };

  if (hidden) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col">
      <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg pointer-events-none">
        <h1 className="font-black text-xl">Valentin XV</h1>        
      </div>

      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 flex justify-center p-4">
        <div className="backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg pointer-events-auto text-center">
          <h1 className="font-black text-xl cursor-pointer" onClick={() => navigator.clipboard.writeText('792NFoxwa77hcHFArNLPftVgPV7ADsRWeZG9QZY1pump')}>
            CA : 792NFoxwa77hcHFArNLPftVgPV7ADsRWeZG9QZY1pump
          </h1>   
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <button className="pointer-events-auto bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0-2C3.47 0 0 3.47 0 7.75v8.5C0 20.53 3.47 24 7.75 24h8.5C20.53 24 24 20.53 24 16.25v-8.5C24 3.47 20.53 0 16.25 0h-8.5z"/>
              <path d="M12 6.25a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5zm0 9.5a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zM18.5 5.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
            </svg>
          </button>
        </a>

        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <button className="pointer-events-auto bg-black hover:bg-gray-800 text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M18.36 2H21l-7.56 8.63L22 22h-6.86l-5.12-6.9L5.09 22H2.36l8.06-9.2L2 2h6.86l4.66 6.29L18.36 2zm-1.21 17.95h2.05L8.18 4.05H6.13l11.02 15.9z"/>
            </svg>
          </button>
        </a>

        <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">
          <button className="pointer-events-auto bg-black hover:bg-gray-800 text-white p-2 rounded-full flex items-center justify-center">
            <img src="https://i.imgur.com/gPJacwG.png" alt="Dexscreener Logo" className="w-6 h-6"/>
            <span className="ml-2 text-sm font-semibold">Dexscreener</span>
          </button>
        </a>
      </div>

      <div className="w-full flex flex-col items-end justify-center gap-4">
        <button onClick={toggleGreenScreen} className="pointer-events-auto bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
      </div>

      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto pb-24 px-4">
          <div className="flex flex-col space-y-4 max-w-3xl mx-auto py-8">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 pointer-events-auto">
          <div className="flex items-center justify-center gap-2">
            <input
              ref={input}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Speak to Valentin XV.."
              className="bg-[#333333] text-white px-4 py-2 rounded-md border border-[#666666] w-full max-w-[600px]"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-[#666666] text-white px-8 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#777777] transition-colors"
            >
              {isLoading ? 'Sending...' : 'SEND'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};