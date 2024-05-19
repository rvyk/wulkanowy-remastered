import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Message: React.FC = () => {
  const [message, setMessage] = useState<{ content: string; id: number }>();
  const hiddenMessages =
    JSON.parse(localStorage.getItem("hiddenMessages") || "[]") || [];

  useEffect(() => {
    fetch("https://messages.wulkanowy.net.pl/v1.json").then((response) => {
      response.json().then((data) => {
        if (
          hiddenMessages.includes(data[0].id) ||
          !data[0].messageTypes.includes("GENERAL_MESSAGE")
        )
          return;

        setMessage(data[0]);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setMessage(undefined);
    localStorage.setItem(
      "hiddenMessages",
      JSON.stringify(hiddenMessages.concat(message?.id))
    );
  };

  if (!message) return null;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="1000"
      data-aos-once="true"
      data-aos-offset="-500"
      className="flex justify-center duration-500 items-center fixed bottom-6 z-50 w-full"
    >
      <div className="bg-secondaryFixed relative text-onSecondaryFixed max-w-7xl text-center font-medium min-h-20 rounded-3xl flex items-center px-24">
        <p>{message.content}</p>
        <button onClick={handleClose} className="absolute right-8">
          <X />
        </button>
      </div>
    </div>
  );
};

export default Message;
