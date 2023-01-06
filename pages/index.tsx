import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import SearchBar from "../components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import Lottie from "react-lottie";
import * as NotFoundAnimationData from "../utils/not-found.json";
import * as LoadingAnimationData from "../utils/loading.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [image, setImage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const NotFoundDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const LoadingDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Head>
        <title>Duhhl-E</title>
        <meta name="description" content="Duhhl-E image generation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <nav className="h-1/6 flex p-2 gap-3 md:gap-1 flex-col md:flex-row items-center md:justify-between">
          <div className="flex gap-3 items-center">
            <h1
              className="font-bold text-2xl md:text-3xl cursor-pointer"
              onClick={() => setImage([])}
            >
              Duhhl-E
            </h1>
            <Link href="/chat-gpt">
              <small className="font-semibold border border-black p-1">
                chatGPT
              </small>
            </Link>
          </div>
          <SearchBar setImage={setImage} setLoading={setLoading} />
          {/* <UploadImage setImage={setImage} setLoading={setLoading} /> */}
        </nav>
        <section
          className={
            `flex justify-center h-5/6` +
            (image.length > 0 ? "md:h-full md:pb-4" : "md:h-5/6 pt-8")
          }
        >
          {loading && (
            <div className="flex flex-col justify-center items-center w-full">
              <Lottie
                options={LoadingDefaultOptions}
                height={400}
                width={400}
              />
              <p className="font-bold text-gray-900 text-2xl -pt-10 -mt-10">
                Fetching images...
              </p>
            </div>
          )}
          {!loading && image.length == 0 && (
            <div className="flex justify-center items-center w-full">
              <Lottie
                options={NotFoundDefaultOptions}
                height={400}
                width={400}
              />
            </div>
          )}
          {!loading && image.length > 0 && (
            <div className="p-2 md:pt-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 max-w-full">
              {image.map((imgURL) => (
                <Image
                  key={imgURL}
                  src={imgURL}
                  alt=""
                  width={256}
                  height={256}
                  className="border-black border-2 shadow-lg p-0"
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
