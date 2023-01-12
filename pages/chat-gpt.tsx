import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MessageBottomBar from "../components/MessageBottomBar";

export interface IMessage {
  from: string;
  message: string;
}

export default function ChatGPT() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEnd = useRef<null | HTMLDivElement>(null);

  console.log(messages);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <main className="h-full">
        <nav className="fixed top-0 bg-white w-full flex p-2 gap-3 md:gap-1 flex-col md:flex-row items-center md:justify-between">
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-2xl md:text-3xl cursor-pointer p-2">
              chatGPT
            </h1>
            <Link href="/">
              <small className="font-semibold border border-black p-1">
                Duhhl-E
              </small>
            </Link>
          </div>
        </nav>
        <section className="flex h-full pt-20 pb-20 flex-nowrap w-full items-end">
          {messages.length > 0 && (
            <div className="flex flex-col p-2 gap-4 w-full">
              {messages.map((msg, index) => {
                const { from, message } = msg;
                return (
                  <div
                    className={
                      from == "user"
                        ? "w-full flex justify-end"
                        : "w-full flex justify-start"
                    }
                    key={index}
                  >
                    <ReactMarkdown
                      // eslint-disable-next-line react/no-children-prop
                      children={message}
                      remarkPlugins={[remarkGfm]}
                      className={
                        from == "user"
                          ? "bg-blue-500 text-white text-justify rounded-lg font-semibold py-2 px-3 max-w-xs md:max-w-2xl overflow-auto"
                          : "bg-gray-200 rounded-lg text-justify font-semibold py-2 px-3 max-w-xs md:max-w-2xl overflow-auto"
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <div ref={messagesEnd}></div>
        <MessageBottomBar setMessages={setMessages} />
      </main>
    </>
  );
}
