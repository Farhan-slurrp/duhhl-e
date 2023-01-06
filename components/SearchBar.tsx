import React, { Dispatch, SetStateAction, useState } from "react";
import { openai } from "../utils/initializeOpenAI";

interface ISearchBarProps {
  setImage: Dispatch<SetStateAction<string[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: React.FC<ISearchBarProps> = ({ setImage, setLoading }) => {
  const [prompt, setPrompt] = useState<string>("");

  const handleClick = async () => {
    if (prompt) {
      setLoading(true);
      try {
        const response = await openai.createImage({
          prompt: prompt,
          n: 6,
          size: "256x256",
        });

        if (response) {
          setImage(
            response.data?.data.map((img) => {
              if (typeof img.url == "string") {
                return img.url;
              } else return "";
            })
          );
          setLoading(false);
        }
      } catch (e) {
        setImage([]);
        setLoading(false);
      }
    }
  };

  async function handleEnterKeyPressed(e: any) {
    if (e.key === "Enter") {
      await handleClick();
    }
  }

  return (
    <div className="w-full md:w-2/3 flex items-center gap-1 md:justify-center">
      <input
        type="text"
        className="border-2 text-gray-700 border-black p-2 w-full shadow-lg"
        placeholder="Type a prompt..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyUp={handleEnterKeyPressed}
      />
      <button
        onClick={handleClick}
        className="bg-black text-white p-2 font-bold border-2 shadow-lg border-black"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
