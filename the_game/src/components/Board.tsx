import React, { useState } from 'react';
import ShowBoard from './ShowBoard';
import { InitialMatrix } from '../BusinessLogic/GameEngine/Matrix';
import { usersList } from '../BusinessLogic/Users';
import { ICardBasic } from '../Types/DexType';
import ShowUsers from './ShowUsers';
import { Col, Row } from 'react-bootstrap';

const Board = () => {
  const [matrix, setMatrix] = useState(InitialMatrix);
  const [users, setUsers] = useState(usersList);
  const [items, setItems] = useState(usersList[0]);
  const [selectedCard, setSelectedCard] = useState<ICardBasic | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  /* function onChangeMatrix(row, col) {
       const matrixCopy = [...matrix];
       const usersCopy = [...users];
       matrixCopy[row][col] = usersCopy[row].splice(col, 1)[0];
       setMatrix(matrixCopy);
       setUsers(usersCopy);
   }*/
  function handleCardClick(index: number) {
    setSelectedCard(items.hand[index]);
    setSelectedCardIndex(index);
  }

  function moveItemToMatrix(itemIndex: number, rowIndex: number, columnIndex: number) {
    if (selectedCard && selectedCardIndex !== null) {
      setMatrix((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        newMatrix[rowIndex][columnIndex] = { Card: items.hand[itemIndex], Occupied: true };
        return newMatrix;
      });
      setItems((prevItems) => {
        console.log(prevItems);
        const newItems = { ...prevItems };
        newItems.hand = newItems.hand.filter((_, index) => index !== itemIndex);
        return newItems;
      });
    }
  }

  return (
    <>
      <Row>
        <Col xs={9}>
          <ShowBoard gameMatrix={matrix} />
        </Col>
        <Col xs={3}>
          <ShowUsers items={items} onCardClick={handleCardClick} moveItemToMatrix={moveItemToMatrix} />
        </Col>
      </Row>
    </>
  );
};

export default Board;
