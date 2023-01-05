import React, { Dispatch, SetStateAction, useState } from "react";
import { openai } from "../utils/initializeOpenAI";

interface ISearchBarProps {
  setImage: Dispatch<SetStateAction<string[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UploadImage: React.FC<ISearchBarProps> = ({ setImage, setLoading }) => {
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);

  const handleClick = async () => {
    if (uploadedImg !== null) {
      setLoading(true);
      try {
        // let fileBuffer: any = Buffer.from(await uploadedImg.arrayBuffer());
        // fileBuffer.name = uploadedImg.name;

        const response = await openai.createImageVariation(
          uploadedImg,
          6,
          "256x256"
        );

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
        console.log(e);
        setImage([]);
        setLoading(false);
      }
    }
  };

  const handleFileOnChange = (e: any) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].size > 4_194_304) {
        alert("Image size cannot be more than 4 MB");
        setUploadedImg(null);
      } else {
        setUploadedImg(e.target.files[0]);
      }
    }
  };

  return (
    <div className="w-full md:w-2/3 flex items-center gap-1 md:justify-center">
      <label className="block w-full">
        <span className="sr-only">Choose File</span>
        <input
          type="file"
          accept="image/png"
          className="block w-full text-sm text-gray-500 file:mr-4 file:p-2 file:border-0 border-2 border-black file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-black hover:file:text-white shadow-lg"
          onChange={handleFileOnChange}
        />
      </label>

      <button
        onClick={handleClick}
        className="bg-black text-white p-2 font-bold shadow-lg"
      >
        Variate
      </button>
    </div>
  );
};

export default UploadImage;
