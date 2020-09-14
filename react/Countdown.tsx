import React, { useEffect, useState, useCallback } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import useMousePosition from './utils/useMousePosition'
import { Block, BotContainer, BotHeader, BotIframeStyle } from './styles'
import useProduct from 'vtex.product-context/useProduct'

import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['leiachatbot']

interface LeiaChatBotProps {// Quais as propriedades serão passadas do editor para o bloco
  avatar: string;
  chatbotName: string;
  callToAction: string;
  initialText: string;
}

const DEFAULT_AVATAR = "https://pm1.narvii.com/6685/ff2eb605bd90880d3b55d370cf932542d363cb8a_128.jpg"
//const DEFAULT_CHATBOTNAME = "Leia"
const DEFAULT_CALLTOACTION = "Olá, posso te ajudar?"
//const DEFAULT_INITIALTEXT = "Olá, percebi que esta em dúvida sobre o produto, como posso ajudar?"

const Countdown: StorefrontFunctionComponent<LeiaChatBotProps> = ({ 
  avatar = DEFAULT_AVATAR, 
  //chatbotName = DEFAULT_CHATBOTNAME, 
  callToAction = DEFAULT_CALLTOACTION, 
  //initialText = DEFAULT_INITIALTEXT
}) => {

  const { product } = useProduct()



  const [outFlag, setOutFlag] = useState(false);
  const [reenterFlag, setReenterFlag] = useState(false);
  const [yPreviousMousePosition, setYPreviousMousePosition] = useState(100);
  const [hoverActivate, setHoverActivate] = useState(false);
  const [open, setOpen] = useState(false);

  const { x, y } = useMousePosition();

  const handles = useCssHandles(CSS_HANDLES)


  useEffect(() => {
    console.log(JSON.stringify(product.productId))
  }, []);

  useEffect(() => {
    const hasMovedCursor = x !== 0 && y !== 0;

    if (hasMovedCursor && !outFlag && y < 10 && yPreviousMousePosition >= 10) {
      setOutFlag(true);
      handleOpenBotOutPage();
      console.log("saiu");
    }
    setYPreviousMousePosition(y);

  }, [outFlag, y, yPreviousMousePosition]);

  const handleOpenBotOutPage = useCallback(() => {
    console.log("handleOpenBot");
    setOpen(true)
  }, []);

  const handleOpenBotHover = useCallback(() => {
    console.log("handleOpenBot");
    setHoverActivate(true)
    setOpen(true)
  }, []);

  const handleMouseReenter = useCallback(() => {
    console.log("handleMouseReenter");
    setReenterFlag(true)
  }, []);

  return (
    <div className={`${handles.chatbot}`}>
      {
        outFlag && !reenterFlag && !hoverActivate &&
        (<Block onMouseEnter={handleMouseReenter}></Block>)
      }

      <BotContainer >
        <BotHeader onMouseEnter={handleOpenBotHover}>
          <img src={avatar} alt="Chatbot avatar" className="botHeaderImage"></img>
        <p>{callToAction}</p>
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
                  <iframe src="https://master.d1suantyavgyv6.amplifyapp.com/" title="Leia ChatBot" width="100%" height="100%" frameBorder="0" />
                </BotIframeStyle>
              </animated.div>
            ))
          }
        </Transition>
      </BotContainer>
    </div >
  )
}

Countdown.schema = {
  title: 'editor.leiachatbot.title',
  description: 'editor.leiachatbot.description',
  type: 'object',
  properties: {
    avatar: {
      title: 'Avatar',
      description: 'URL da imagem de avatar',
      type: 'string',
      default: "https://pm1.narvii.com/6685/ff2eb605bd90880d3b55d370cf932542d363cb8a_128.jpg",
    },
    chatbotName: {
      title: 'Nome do chatbot',
      description: 'Nome que será usado pelo chatbot',
      type: 'string',
      default: 'Leia',
    },
    callToAction: {
      title: 'Chamada',
      description: 'Texto de chamada do chatbot',
      type: 'string',
      default: 'Olá, posso te ajudar?',
    },
    initialText: {
      title: 'Texto inicial',
      description: 'Texto mostrado no início da conversa',
      type: 'string',
      default: 'Olá, percebi que esta em dúvida sobre o produto, como posso ajudar?',
    },
  },
}

export default Countdown
