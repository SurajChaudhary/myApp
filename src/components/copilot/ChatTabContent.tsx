import React from "react";
import CurrentContext from "./CurrentContext";
import RelatedContext from "./RelatedContext";
import ChatMessageSection from "./ChatMessageSection";
import LatestResponse from "./LatestResponse";
import ChatInputSection from "./ChatInputSection";
import styles from "../../styles/copilot/ChatTabContent.module.css";

interface ChatTabContentProps {
  data: {
    currentContext: string;
    relatedContext: string;
    chatMessages: { sender: "user" | "llm"; text: string }[];
    latestResponse: string;
    dropdownData: {
      projectNames: string[];
      sectionNames: string[];
      sectionCodes: string[];
      sectionDescriptions: string[];
      workPaperNames: string[];
    };
    auditUniverseName: string;
  };
  theme: "light" | "dark";
  apiDetails: {
    endpoint: string;
    apiKey: string;
  };
}

interface Message {
  sender: "user" | "llm";
  content: string;
  timestamp: string;
}

const ChatTabContent: React.FC<ChatTabContentProps> = ({
  data,
  theme,
  apiDetails,
}) => {
  const [lastResponse, setLastResponse] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    { sender: "user", content: "Hello there!", timestamp: "10:00 AM" },
    {
      sender: "llm",
      content: "Response from LLM: Hello there!",
      timestamp: "10:01 AM",
    },
  ]);

  const handleSendMessage = async (prompt: string, model: string) => {
    const userMessage: Message = {
      sender: "user", // Explicitly set as "user"
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    const llmResponse: Message = {
      sender: "llm", // Explicitly set as "llm"
      content: `Response from LLM: ${prompt}`,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    setMessages((prevMessages) => [...prevMessages, userMessage, llmResponse]);

    const newResponse = `Latest Response from LLM: ${prompt}`;
    setLastResponse(newResponse); // Update the latest response
  };

  const handleRegenerateContext = async () => {
    // Implement logic for regenerating related context
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(lastResponse);
  };

  return (
    <div className={`${styles.container}`}>
      {/* Pass the correct props to CurrentContext */}
      <CurrentContext
        initialContext={{
          auditUniverseName: data.auditUniverseName,
          dropdownData: data.dropdownData || {
            projectNames: [],
            sectionNames: [],
            sectionCodes: [],
            sectionDescriptions: [],
            workPaperNames: [],
          }, // Provide fallback to prevent undefined
        }}
        theme={theme}
      />
      {/* Pass initialContext instead of relatedContext */}
      <RelatedContext
        initialContext={{
          relatedData: Array.isArray(data.relatedContext)
            ? data.relatedContext
            : [data.relatedContext], // Ensure relatedData is an array
        }}
        theme={theme}
        onRegenerate={handleRegenerateContext}
      />
      <ChatMessageSection
        initialContext={{}}
        theme={theme}
        messages={messages}
      />
      <LatestResponse
        lastResponse={lastResponse}
        theme={theme}
        onCopy={handleCopyResponse}
      />
      <ChatInputSection
        theme={theme}
        models={["GPT-4", "GPT-3.5"]}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatTabContent;
