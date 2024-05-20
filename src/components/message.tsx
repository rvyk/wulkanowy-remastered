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
          (message) =>
            !message.targetFlavor &&
            message.priority != "LOW" &&
            message.messageTypes.includes("GENERAL_MESSAGE"),
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
      JSON.stringify(hiddenMessages.concat(message?.id || [])),
    );
  };

  if (!message) return null;

  return (
    <div
      data-aos={isDesktop ? "fade-up" : "fade-down"}
      data-aos-delay={isDesktop ? 1000 : 0}
      data-aos-once="true"
      data-aos-offset="-500"
      className="relative z-50 flex w-full items-center justify-center px-6 max-lg:top-6 lg:fixed lg:bottom-6"
    >
      <div className="relative flex min-h-20 items-center rounded-3xl bg-secondaryFixed text-center font-medium text-onSecondaryFixed lg:px-16">
        <a
          href={message.destinationUrl || ""}
          target="_blank"
          className={cn(
            !message.destinationUrl && "pointer-events-none cursor-default",
          )}
        >
          <p className="p-4">{message.content}</p>
        </a>
        <button
          onClick={handleClose}
          className="absolute right-8 rounded-button bg-onSecondaryContainer p-2 text-onSecondaryFixed max-lg:hidden"
        >
          <X />
        </button>
      </div>
      <button
        onClick={handleClose}
        className="absolute -bottom-4 right-3 rounded-button bg-onSecondaryContainer p-2 text-onSecondaryFixed lg:hidden"
      >
        <X />
      </button>
    </div>
  );
};

export default Message;
