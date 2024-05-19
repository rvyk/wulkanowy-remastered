"use client";

import useBetterMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { WulkanowyMessages } from "@/types/wulkanowy";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Message: React.FC = () => {
  const [message, setMessage] = useState<WulkanowyMessages>();
  const isDesktop = useBetterMediaQuery("(min-width: 768px)");

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
          // !hiddenMessages.includes(firstMessage.id) &&
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
      data-aos={isDesktop ? "fade-up" : "fade-down"}
      data-aos-delay={isDesktop ? 1000 : 0}
      data-aos-once="true"
      data-aos-offset="-500"
      className="flex justify-center relative items-center lg:fixed max-lg:top-6 lg:bottom-6 z-50 w-full px-6"
    >
      <div className="relative bg-secondaryFixed text-onSecondaryFixed text-center font-medium min-h-20 rounded-3xl flex items-center lg:px-16">
        <a
          href={message.destinationUrl || ""}
          target="_blank"
          className={cn(
            !message.destinationUrl && "cursor-default pointer-events-none"
          )}
        >
          <p className="p-4">{message.content}</p>
        </a>
        <button
          onClick={handleClose}
          className="absolute right-8 max-lg:hidden bg-onSecondaryContainer rounded-button p-2 text-onSecondaryFixed"
        >
          <X />
        </button>
      </div>
      <button
        onClick={handleClose}
        className="absolute -bottom-4 right-3 bg-onSecondaryContainer rounded-button p-2 text-onSecondaryFixed lg:hidden"
      >
        <X />
      </button>
    </div>
  );
};

export default Message;
