import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import { OpenAI } from "openai";
import { z } from "zod";

import { BotCard, BotMessage } from "@/components/message";
import { spinner } from "@/components/spinner";
import { runOpenAICompletion } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Flight {
  id: number;
  flightNumber: string;
  departure: string;
  arrival: string;
}

// An example of a flight card component.
function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div>
      <h2>Flight Information</h2>
      <p>Flight Number: {flight.flightNumber}</p>
      <p>Departure: {flight.departure}</p>
      <p>Arrival: {flight.arrival}</p>
    </div>
  );
}

// An example of a function that fetches flight information from an external API.
async function getFlights() {
  return [
    { id: 1, flightNumber: "123", departure: "SFO", arrival: "JFK" },
    { id: 2, flightNumber: "456", departure: "JFK", arrival: "SFO" },
  ];
}

async function submitUserMessage(userInput: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const reply = createStreamableUI(<BotMessage className="items-center">{spinner}</BotMessage>);

  const completion = runOpenAICompletion(openai, {
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are a flight assistant",
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: "search_flights",
        description: "Search for flights based on the user's input",
        parameters: z.object({
          userQuery: z.string().describe("The user's query"),
        }),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("search_flights", async ({}) => {
    reply.update(<BotCard>Loading flights</BotCard>);

    const flights = await getFlights();

    reply.done(
      <BotCard>
        <div className="flex flex-col gap-2">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "search_places",
        content: JSON.stringify(flights),
      },
    ]);
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
