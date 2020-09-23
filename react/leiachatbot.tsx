import React, { useEffect, useState, useCallback } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import useMousePosition from './utils/useMousePosition'
import { Block, BotContainer, BotHeader, PreBlock } from './styles'
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'
import ChatBot from './ChatBot';
import { MdClose } from 'react-icons/md'


const CSS_HANDLES = ['leiachatbot']

interface LeiaChatBotProps {
  avatar: string;
  chatbotName: string;
  callToAction: string;
  initialText: string;
}

const leiachatbot: StorefrontFunctionComponent<LeiaChatBotProps> = ({
  avatar,
  chatbotName,
  callToAction,
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
    const hasMovedCursor = x !== 0 && y !== 0;

    if (hasMovedCursor && !outFlag && y < 10 && yPreviousMousePosition >= 10) {
      setOutFlag(true);
      handleOpenBotOutPage();
    }
    setYPreviousMousePosition(y);

  }, [outFlag, y, yPreviousMousePosition]);

  const handleOpenBotOutPage = useCallback(() => {
    if (!open) {
      setOpen(true)
    }
  }, [open]);

  const handleOpenBotHover = useCallback(() => {
    if (!open) {
      setHoverActivate(true)
      setOpen(true)
    }
  }, [open]);

  const handleCloseBot = useCallback(() => {
    if (open) {
      setOpen(false)
    }
  }, [open]);

  const handleMouseReenter = useCallback(() => {
    setReenterFlag(true)
  }, []);

  return (
    <div className={`${handles.chatbot}`}>
      {
        outFlag && !reenterFlag && !hoverActivate &&
        (<><PreBlock/><Block onMouseEnter={handleMouseReenter}/></>)
      }

      <BotContainer >
        <BotHeader onMouseEnter={handleOpenBotHover}>
          <img src={avatar} alt="Chatbot avatar" className="botHeaderImage"></img>
          {open ? (<><strong>{chatbotName}</strong> <MdClose onClick={handleCloseBot} size={24}/></>) : <p>{callToAction}</p>}
          
        </BotHeader>
        <Transition
          native
          items={open}
          from={{ height: 0 }}
          enter={{ height: 400 }}
          leave={{ height: 0 }}
        >

          {show =>
            show &&
            (props => (
              <animated.div style={props}>
                  <ChatBot productId={product.productId}/>
              </animated.div>
            ))
          }
        </Transition>
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
