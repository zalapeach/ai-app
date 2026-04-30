"use client";

import { useEffect, useRef } from "react";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input"; //issue here
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/lib/contexts/chat-context";

export function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, status } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {});

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <ScrollArea ref={scrollAreaRef} className="flex-1 overflow-hiden">
        <div className="pr-4">
          <MessageList messages={messages} isLoading={status === "streaming"} />
        </div>
      </ScrollArea>
      <div className="mt-4 flex-shrink-0">
        <MessageInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={ status === "submitted" || status === "streaming" }
        />
      </div>
    </div>
  );
}
