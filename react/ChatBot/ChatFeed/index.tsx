import React from 'react'
import ResponseCard, { ICard } from '../ResponseCard'
import BlogMessage from '../BlogMessage'
import { Container, ChatContainer, MessageContainer } from './style'

export interface Message {
  user: 'user' | 'bot';
  text?: string;
  responseCard?: ICard[];
}

interface IChatProps {
  messages: Message[];
  bubbleStyles: {
    user:{
      styles:{
        [key: string]: number | string;
      }
    };
    bot: {
      styles:{
        [key: string]: number | string;
      }
    };
  };
}

const ChatFeed: React.FC<IChatProps> = ({ messages, bubbleStyles }) => {

  return (
    <Container>
      <ChatContainer>
        {
          messages.map((message, index) => (
            <MessageContainer key={index}>
              {message.responseCard && (
                <ResponseCard cards={message.responseCard} />
              )}

              {!message.responseCard && (
                <BlogMessage text={message.text ? message.text : ''} bubbleStyle={message.user === 'user'? bubbleStyles.user.styles : bubbleStyles.bot.styles}/>
              )}
            </MessageContainer>
          ))
        }
      </ChatContainer>

    </Container>
  )
}

export default ChatFeed