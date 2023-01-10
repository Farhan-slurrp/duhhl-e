import React, { useState } from "react";
import { IMessage } from "../pages/chat-gpt";
import { openai } from "../utils/initializeOpenAI";

interface IMessageBottomBarProps {
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const MessageBottomBar: React.FC<IMessageBottomBarProps> = ({
  setMessages,
}) => {
  const [userMessage, setUserMessage] = useState<string>("");

  async function handleClick() {
    setMessages((e) => [...e, { from: "user", message: userMessage }]);
    setUserMessage("");
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userMessage,
        temperature: 1,
        max_tokens: 3780,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });

      if (response && response.data?.choices.length > 0) {
        setMessages((e) => [
          ...e,
          { from: "gpt", message: response.data?.choices[0].text! },
        ]);
      }
    } catch (e) {
      setMessages((e) => [
        ...e,
        { from: "gpt", message: "I cannot answer your question" },
      ]);
    }
  }

  async function handleEnterKeyPressed(e: any) {
    if (e.key === "Enter") {
      await handleClick();
    }
  }

  return (
    <div className="fixed bottom-0 w-full border-t border-gray-300 shadow-md p-3 bg-white">
      <div className="w-full flex items-center gap-1 justify-center">
        <input
          type="text"
          value={userMessage}
          className="border-2 text-gray-700 border-black p-2 w-full shadow-lg bg-transparent"
          placeholder="Type your message..."
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyUp={handleEnterKeyPressed}
        />
        <button
          onClick={handleClick}
          className="bg-black text-white p-2 font-bold border-2 shadow-lg border-black"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageBottomBar;
