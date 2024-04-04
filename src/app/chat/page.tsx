"use client";

import { useUIState, useActions } from "ai/rsc";
import { useState } from "react";

import { UserMessage } from "@/components/message";

import type { AI } from "./action";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col py-24">
      {
        // View messages in UI state
        messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.display}
          </div>
        ))
      }

      <form
        onSubmit={async (e: any) => {
          e.preventDefault();

          // Blur focus on mobile
          if (window.innerWidth < 600) {
            e.target["message"]?.blur();
          }

          const value = inputValue.trim();
          setInputValue("");
          if (!value) return;

          // Add user message UI
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              id: Date.now(),
              display: <UserMessage>{value}</UserMessage>,
            },
          ]);

          try {
            // Submit and get response message
            const responseMessage = await submitUserMessage(value);
            setMessages((currentMessages) => [...currentMessages, responseMessage]);
          } catch (error) {
            // You may want to show a toast or trigger an error state.
            console.error(error);
          }
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={inputValue}
          placeholder="Say something..."
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
