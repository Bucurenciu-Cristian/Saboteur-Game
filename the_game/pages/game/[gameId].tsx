import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useSocket from '@hooks/useSocket';
import { Button, Col, Row } from 'react-bootstrap';
import ShowUsers from '@components/ShowUsers';
import ShowBoard from '@components/ShowBoard';
import { changeOrientation } from '@src/BusinessLogic/ChangeOrientation';

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

function GameId() {
  const socket = useSocket();

  const [gameState, setGameState] = useState(null);
  // const [selectedCard, setSelectedCard] = useState({ card: null, index: -1 });
  const [hasJoined, setHasJoined] = useState(false);
  const selectedCard = useRef({ card: null, index: -1 });

  const router = useRouter();
  let { gameId } = router.query;
  gameId = Number(gameId);
  const placeCardEvent = 'placeCard';
  const rotateCardEvent = 'rotateCard';
  const passTurnEvent = 'passTurn';

  useEffect(() => {
    if (!gameId || !socket) return;

    (async () => {
      const roomExists = await checkRoomExists(gameId);
      if (roomExists.length === 0) {
        router.push('/'); // Redirect to the home page if the room doesn't exist
        return;
      }

      if (!hasJoined) {
        // Join the room with the given gameId
        socket.emit('join', gameId);
        setHasJoined(true);
      }

      return () => {
        socket.emit('leave', gameId);
      };
    })();
  }, [gameId, router, socket, hasJoined, setHasJoined]);
  // Listen for server updates and update the client state accordingly
  useEffect(() => {
    if (!socket) return;

    socket.on('GAME_STATE_UPDATE', (data) => {
      console.log('client', data);
      setGameState(data);
    });
  }, [socket]);

  const helperAlert = (message) => {
    const rotateCardEvent = 'rotateCard';
    const message1 = 'Please select a card from your hand first ';
    switch (message) {
      case placeCardEvent:
        alert(`${message1} and then place it into the board.`);
        break;
      case rotateCardEvent:
        alert(`${message1} to rotate it`);
        break;
    }
  };
  // Ce poate sa faca un client?
  // Sa trimita la server urmatoarele event-uri: playPath, playAction,

  // trebuie sa arat si a cui e randul in momentul actual. Ca ceilalti sa astepte.
  // socket.emit('playPath');
  // socket.emit('playAction');
  const handlePathTurn = (row, column) => {
    const theCard = selectedCard.current.card;
    if (theCard) {
      if (theCard.code[1] === 'P') {
        socket.emit(placeCardEvent, {
          gameId,
          card: theCard,
          row,
          column,
          handIndex: selectedCard.current.index,
        });

        // Reset the selected card
        selectedCard.current = { card: null, index: -1 };
      } else if (theCard.code[1] === 'A') {
        helperAlert(placeCardEvent);
      }
    } else {
      helperAlert(placeCardEvent);
    }
  };
  const handlePassTurn = () => {
    if (selectedCard.current.card) {
      // Emit the event to the server
      socket.emit('passTurn', {
        gameId,
        handIndex: selectedCard.current.index,
      });

      // Reset the selected card
      selectedCard.current = { card: null, index: -1 };
    } else {
      alert('Please select a card to discard first.');
    }
  };

  const handleRotateCard = () => {
    if (selectedCard.card) {
      const rotatedCode = changeOrientation(selectedCard.card.code);
      // Create a new object to avoid mutating the original card object
      const rotatedCard = {
        ...selectedCard.card,
        code: rotatedCode,
      };

      // Update the selected card and the player's hand
      // setSelectedCard({ ...selectedCard, card: rotatedCard });
      selectedCard.current = { ...selectedCard.current, card: rotatedCard };
      // Make a copy of the game state and update the player's hand
      const newGameState = { ...gameState };
      newGameState.players[newGameState.currentPlayer].hand[selectedCard.index] = rotatedCard;

      // Update the game state
      setGameState(newGameState);
      // setSelectedCard({ card: null, index: -1 });
      selectedCard.current = { card: null, index: -1 };
    } else {
      alert('Please select a card first.');
    }
  };
  const handleActionTurn = () => {};
  // Render the component based on the client state
  return (
    <>
      <Row>
        <div>Game ID: {gameId}</div>
      </Row>
      {gameState && (
        <Row>
          <Col xs={9}>
            <ShowBoard gameMatrix={gameState.gameBoard} onBoardSquareClick={(row, column) => handlePathTurn(row, column)} />
            <Row>
              <Col>
                The deck has {gameState.deck.length} cards <br /> the discard pile has {gameState.discardPile.length} cards
              </Col>
              <Col />
              <Col />
            </Row>
          </Col>
          <Col xs={3}>
            <div>Players Turn {gameState.currentPlayer + 1}</div>
            <ShowUsers
              items={gameState.players[gameState.currentPlayer]}
              onCardClick={(card, index) => {
                selectedCard.current = { card, index };
              }}
            />
            {/* <ShowUsers items={gameState.players[0]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowUsers items={gameState.players[1]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowUsers items={gameState.players[2]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}

            <Row>
              <Button onClick={handleRotateCard}>Rotate Card</Button>
            </Row>
            <Row>
              {' '}
              <Button onClick={handlePassTurn}>Pass Turn</Button>{' '}
            </Row>
            <br />

            <Row>Others players: Here are the other players</Row>

            <br />

            <Row>{/* <Button onClick={handlePathTurn}>Play Path-Nope</Button> */}</Row>
            <br />

            <Row>{/* <Button onClick={handleActionTurn}>Play Action-Nope</Button> */}</Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default GameId;
