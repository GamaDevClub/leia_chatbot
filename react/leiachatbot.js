// import React, {FunctionComponent, useEffect, useState, useCallback } from 'react'
// import { Transition, animated } from 'react-spring/renderprops'
// import useMousePosition from './utils/useMousePosition'
// import { Block, BotContainer, BotHeader, BotIframeStyle } from './styles'
// import useProduct from 'vtex.product-context/useProduct'
// import axios from 'axios'
// import { useCssHandles } from 'vtex.css-handles'


import React from 'react'
import { BotContainer } from './styles'



import MessagesList from './Components/MessagesList'
import { Message } from "react-chat-ui";




const CSS_HANDLES = ['leiachatbot']

// interface LeiaChatBotProps {
//   avatar: string;
//   chatbotName: string;
//   callToAction: string;
//   initialText: string;
// }

const leiachatbot = ({
  // avatar,
  // chatbotName,
  // callToAction,
}) => {

  // const { product } = useProduct()

  // const [outFlag, setOutFlag] = useState(false);
  // const [reenterFlag, setReenterFlag] = useState(false);
  // const [yPreviousMousePosition, setYPreviousMousePosition] = useState(100);
  // const [hoverActivate, setHoverActivate] = useState(false);
  // const [open, setOpen] = useState(false);

  // const { x, y } = useMousePosition();

  // const handles = useCssHandles(CSS_HANDLES)

  // useEffect(() => {
  //   axios.get(
  //     'https://zq9qbxud1d.execute-api.us-west-2.amazonaws.com/test/produtos',
  //     {
  //       data: {
  //         queryStringParameters: {
  //           productid: product.productId,
  //         }
  //       }
  //     }
  //   )
  // }, []);

  // useEffect(() => {
  //   const hasMovedCursor = x !== 0 && y !== 0;

  //   if (hasMovedCursor && !outFlag && y < 10 && yPreviousMousePosition >= 10) {
  //     setOutFlag(true);
  //     handleOpenBotOutPage();
  //   }
  //   setYPreviousMousePosition(y);

  // }, [outFlag, y, yPreviousMousePosition]);

  // const handleOpenBotOutPage = useCallback(() => {
  //   if (!open) {
  //     setOpen(true)
  //   }
  // }, [open]);

  // const handleOpenBotHover = useCallback(() => {
  //   if (!open) {
  //     setHoverActivate(true)
  //     setOpen(true)
  //   }
  // }, [open]);

  // const handleMouseReenter = useCallback(() => {
  //   setReenterFlag(true)
  // }, []);


  const state = {
    messages: [
      new Message({
        id: 1,
        message: "I'm the recipient! (The person you're talking to)",
      }), // Gray bubble
      new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    ],
  };

  return (
    <div className={`${handles.chatbot}`}>
      {/* {
        outFlag && !reenterFlag && !hoverActivate &&
        (<Block onMouseEnter={handleMouseReenter}></Block>)
      } */}

      <BotContainer >


        <MessagesList messages={state}/>





{/* 



        <BotHeader onMouseEnter={handleOpenBotHover}>
          <img src={avatar} alt="Chatbot avatar" className="botHeaderImage"></img>
          {open ? <strong>{chatbotName}</strong> : <p>{callToAction}</p>}
        </BotHeader>
        <Transition
          native
          items={open}
          from={{ height: 0 }}
          enter={{ height: 300 }}
          leave={{ height: 0 }}
        >

          {show =>
            show &&
            (props => (
              <animated.div style={props}>
                <BotIframeStyle>
                  <iframe src={`https://master.d299xj4w1w2mhk.amplifyapp.com/`} title="Leia ChatBot" width="100%" height="100%" frameBorder="0" />
                </BotIframeStyle>
              </animated.div>
            ))
          }
        </Transition> */}
      </BotContainer>
    </div >
  )
}

leiachatbot.defaultProps = {
  avatar: "https://uploaddeimagens.com.br/images/002/879/928/full/leiachatbot.png?1600178253",
  chatbotName: "Leia",
  callToAction: "Olá, posso te ajudar?",
}

leiachatbot.schema = {
  title: 'editor.leiachatbot.title',
  description: 'editor.leiachatbot.description',
  type: 'object',
  properties: {
    avatar: {
      title: 'Avatar',
      description: 'URL da imagem de avatar',
      type: 'string',
    },
    chatbotName: {
      title: 'Nome do chatbot',
      description: 'Nome que será usado pelo chatbot',
      type: 'string',
    },
    callToAction: {
      title: 'Chamada',
      description: 'Texto de chamada do chatbot',
      type: 'string',
    }
  },
}

export default leiachatbot
