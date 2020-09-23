import React, { useState, useCallback } from 'react'
import { Container, Card } from './style'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export interface ICard {
  attachmentLinkUrl: string;
  imageUrl: string;
  title: string;
  subTitle: string;
}

interface IProps {
  cards: ICard[];
}

const ResponseCard: React.FC<IProps> = ({ cards }) => {

  const [index, setIndex] = useState(0);

  const handleSetIndex = useCallback((direction: number) => {

    if (direction === 0) {
      if (index === 0) {
        setIndex(cards.length - 1);
      } else {
        setIndex(index_ => index_ - 1);
      }
    } else {
      if (index === cards.length - 1) {
        setIndex(0);
      } else {
        setIndex(index_ => index_ + 1);
      }
    }

  }, [index, cards.length])

  return (
    <Container>
      <button onClick={() => handleSetIndex(0)}><FiChevronLeft size={12}/></button>
      <Card>
        <img src={cards[index].imageUrl} alt={cards[index].title} />
        <h4>{cards[index].title}</h4>
        <p>{cards[index].subTitle}</p>
        <a href={cards[index].attachmentLinkUrl}>Ver produto</a>
      </Card>
      <button onClick={() => handleSetIndex(1)}><FiChevronRight size={12}/></button>
    </Container>
  )
}

export default ResponseCard