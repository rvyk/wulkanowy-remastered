"use client";

import { cn } from "@/lib/utils";
import { WulkanowyMessages } from "@/types/wulkanowy";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Message: React.FC = () => {
  const [message, setMessage] = useState<WulkanowyMessages>();
  let hiddenMessages: number[] = [];
  if (typeof window !== "undefined") {
    hiddenMessages =
      JSON.parse(localStorage.getItem("hiddenMessages") || "[]") || [];
  }

  useEffect(() => {
    fetch("https://messages.wulkanowy.net.pl/v1.json").then((response) => {
      response.json().then((data: WulkanowyMessages[]) => {
        const filteredMessages = data.filter(
          (message) => !message.targetFlavor
        );
        const firstMessage = filteredMessages[0];

        if (
          firstMessage &&
          !hiddenMessages.includes(firstMessage.id) &&
          firstMessage.isVisible
        ) {
          setMessage(firstMessage);
        }
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setMessage(undefined);
    localStorage.setItem(
      "hiddenMessages",
      JSON.stringify(hiddenMessages.concat(message?.id || []))
    );
  };

  if (!message) return null;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="1000"
      data-aos-once="true"
      data-aos-offset="-500"
      className="flex justify-center duration-500 items-center fixed lg:bottom-6 z-50 w-full max-lg:px-6"
    >
      <div className="relative bg-secondaryFixed text-onSecondaryFixed max-w-7xl text-center font-medium min-h-20 rounded-3xl flex items-center px-24">
        <a
          href={message.destinationUrl || ""}
          target="_blank"
          className={cn(
            !message.destinationUrl && "cursor-default pointer-events-none"
          )}
        >
          <p>{message.content}</p>
        </a>
        <button onClick={handleClose} className="absolute right-8">
          <X />
        </button>
      </div>
    </div>
  );
};

export default Message;
