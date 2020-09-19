import React from "react";
import { ChatFeed, Message } from "react-chat-ui";

export default ({ messages}) => (
  <ChatFeed
    maxHeight={window.innerHeight - 80}
    messages={messages.messages}
    isTyping={false}
    showSenderName
    bubblesCentered={false}
  />
);