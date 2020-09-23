import React, { useState, useCallback, useEffect, useRef } from 'react';
import Amplify, { Interactions } from 'aws-amplify';

import { Container, InputMessageContainer, ChatFeedContainer } from './style';
import { MdSend } from 'react-icons/md';
import ChatFeed, { Message } from './ChatFeed';

const API_KEY = 'us-west-2:7e9e1657-489b-4317-87f9-18bd5d52c888'; // Informe a chave cognito da Leia


const bubbleStyles = {
  user: {
    styles: {
      background: "#c2c2c2",
      color: "white",
      marginLeft: "auto",
      marginRight: 0,
      borderRadius: "8px 8px 0px 8px",
    }
  },
  bot: {
    styles: {
      background: "blue",
      color: "white",
    }
  }
}

Amplify.configure({
  Auth: {
    identityPoolId: API_KEY,
    region: 'us-west-2'
  },
  Interactions: {
    bots: {
      "leiabot_dev": {
        "name": "leiabot_dev",
        "alias": "$LATEST",
        "region": "us-west-2",
      },
    }
  }
});

interface ICard {
  attachmentLinkUrl: string;
  imageUrl: string;
  title: string;
  subTitle: string;
}

interface IChatBotProps {
  productId: number;
}

const ChatBot: React.FC<IChatBotProps> = ({ productId }) => {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "bot",
      text: "Olá, eu posso te ajudar",
    }
  ])

  useEffect(() => {
    //Send message to AWS
    Interactions.send("leiabot_dev", String(productId)).then(response => { console.log(response) });
  }, [])

  const onChange = useCallback((e: any) => {
    const input_ = e.target.value
    setInput(input_)
  }, [])


  const submitMessage = useCallback(async (inputMessage: string) => {

    if (inputMessage !== '') {
      const message: Message = {
        user: "user",
        text: inputMessage,
      };
      let internMessages = [...messages, message]

      setMessages(internMessages)


      //Send message to AWS
      const response = await Interactions.send("leiabot_dev", inputMessage);
      console.log(response);

      const responseMessage: Message = {
        user: "bot",
        text: response.message,
      };
      internMessages = [...internMessages, responseMessage];

      if (response.responseCard) {
        if (response.responseCard.genericAttachments) {
          const cards: ICard[] = response.responseCard.genericAttachments
          console.log(cards)

          const responseCard: Message = {
            user: "bot",
            responseCard: cards,
          };

          internMessages = [...internMessages, responseCard];
        }
      }

      setMessages(internMessages);
    }
  }, [messages])

  const _handleKeyPress = useCallback((e: any) => {
    if (e.key === 'Enter') {
      submitMessage(input)
      setInput('')
    }
  }, [input, submitMessage])

  const handleButtonSubmit = useCallback(() => {
    console.log('Passou')
    submitMessage(input)
    setInput('')
  }, [input, submitMessage])

  const messagesEndRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <ChatFeedContainer>
        <ChatFeed messages={messages} bubbleStyles={bubbleStyles} />
        <div ref={messagesEndRef}/>
      </ChatFeedContainer>
      <InputMessageContainer>
        <input
          onKeyDown={e => _handleKeyPress(e)}
          onChange={e => onChange(e)}
          value={input}
        />
        <button onClick={handleButtonSubmit}><MdSend size={24}/></button>
      </InputMessageContainer>
    </Container>
  );

}

export default ChatBot;