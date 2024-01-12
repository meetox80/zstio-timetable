import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type MessageType = "INFO" | "UPDATE" | "WARNING" | "ERROR" | "SILENT";
type MessageTypeDisplay = "POPUP" | "BANNER";

type TimeRange = {
  from: string;
  to: string;
};

type Message = {
  id: string;
  message?: string;
  published: boolean;
  date: Date;
  type: MessageType;
  displayType: MessageTypeDisplay;
  toUrl?: string;
  redirectUrl?: string;
  displayTime?: TimeRange;
};

const MessageType: {
  [key in MessageType]: {
    display: string;
    color: string;
  };
} = {
  INFO: {
    display: "Informacja",
    color: "bg-gray-100 dark:bg-[#212121] dark:text-gray-300",
  },
  WARNING: {
    display: "Ostrzeżenie",
    color: "bg-yellow-100 dark:bg-yellow-400",
  },
  ERROR: { display: "Błąd", color: "bg-red-100 dark:bg-red-400" },
  UPDATE: { display: "Aktualizacja", color: "bg-green-100 dark:bg-green-400" },
  SILENT: {
    display: "",
    color: "bg-gray-50 dark:bg-[#212121] dark:text-gray-300",
  },
};

const Messages: React.FC = () => {
  const [message, setMessage] = useState<Message | null>();
  const [bannerShowed, setShowBanner] = useState(false);

  const pathname = usePathname();

  const mapMessages = useCallback(
    (message: Message) => {
      const isMessagePublished = message.published;
      const isMessageForCurrentPath =
        message.toUrl === pathname || message.toUrl === null;

      if (isMessagePublished && isMessageForCurrentPath) {
        if (localStorage.getItem(message.id)) return;
        setShowBanner(true);
        return message;
      }
      return null;
    },
    [pathname],
  );

  const fetchMessage = useCallback(async () => {
    try {
      const res = await axios.get("/proxy/cms/messages");
      const { messages } = res.data;

      const message = messages.find(mapMessages);
      setMessage(message || null);
    } catch (error) {
      console.error(error);
    }
  }, [mapMessages]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  if (!message) return;

  if (message.displayType == "BANNER") {
    return (
      <div
        className={`${
          bannerShowed ? "absolute" : "hidden"
        } left-0 top-0 z-50 flex w-full flex-row justify-between border-b border-gray-200 p-5 ${
          MessageType[message.type].color
        } dark:border-[#202020]`}
      >
        <div className="mx-auto flex flex-col items-center md:flex-row">
          <p className="flex flex-col items-center text-sm font-normal md:flex-row">
            <span className="font-bold">
              {MessageType[message.type].display}
            </span>
            <span className="mx-4 text-wrap text-center font-semibold">
              {message?.message}{" "}
            </span>
          </p>
          {!!message?.redirectUrl && (
            <a
              href={message?.redirectUrl}
              className="me-2 ml-3 mt-2 inline-flex items-center justify-center rounded-lg bg-[#321c21] px-3 py-2 text-xs font-medium text-white transition-all hover:bg-[#480e0c] focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800 md:mt-0"
            >
              Przejdź <ArrowRightIcon className="ms-2 h-3 w-3 rtl:rotate-180" />
            </a>
          )}
        </div>
        <button
          onClick={() => {
            setShowBanner(false);
            localStorage.setItem(message.id, "readed");
            fetchMessage();
          }}
          className="border-0 bg-transparent "
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    );
  }
};

export default Messages;
