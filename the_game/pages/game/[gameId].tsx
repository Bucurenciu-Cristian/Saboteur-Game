import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import useSocket from '@hooks/useSocket';
import { Button, Col, Row } from 'react-bootstrap';
import ShowPlayer from '@components/ShowPlayer';
import ShowBoard from '@components/ShowBoard';
import { changeOrientation } from '@src/BusinessLogic/ChangeOrientation';

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

function getCardCondition(theCard, number: number, char: string) {
  return theCard.code[number] === char;
}

function GameId() {
  const socket = useSocket();

  const [gameState, setGameState] = useState(null);
  // const [selectedCard, setSelectedCard] = useState({ card: null, index: -1 });
  const [hasJoined, setHasJoined] = useState(false);
  const [validCoordinates, setValidCoordinates] = useState([]);

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
      setValidCoordinates([]);
    });
    socket.on('validCoordinates', (coordinates) => {
      setValidCoordinates(coordinates);
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
  const handlePathTurn = (row, column) => {
    const theCard = selectedCard.current.card;
    if (theCard) {
      if (getCardCondition(theCard, 1, 'P')) {
        socket.emit(placeCardEvent, {
          gameId,
          card: theCard,
          row,
          column,
          handIndex: selectedCard.current.index,
          playerId: gameState.currentPlayer,
        });

        // Reset the selected card
        selectedCard.current = { card: null, index: -1 };
      } else if (getCardCondition(theCard, 1, 'A')) {
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
  // Function to trigger event to the server
  const triggerEventToServer = (card, index) => {
    console.log('Selected card changed:', { card, index });
    // Trigger the event to the server here
    socket.emit('selectCard', {
      gameId,
      handIndex: index,
      card,
    });
  };
  // Render the component based on the client state
  return (
    <>
      <Row>
        <div>Game ID: {gameId}</div>
      </Row>
      {gameState && (
        <Row>
          <Col xs={8}>
            <ShowBoard
              validCoordinates={validCoordinates}
              gameMatrix={gameState.gameBoard}
              onBoardSquareClick={(row, column) => handlePathTurn(row, column)}
            />
            <Row>
              <Col>
                The deck has {gameState.deck.length} cards <br /> the discard pile has {gameState.discardPile.length} cards
              </Col>
              <Col>Path Continued until finished? {JSON.stringify(gameState.pathContinued)}</Col>
              <Col />
            </Row>
            <Row>
              <Col>
                Play Actions on: <br />
                {gameState.players.map((player, index) => {
                  if (index !== gameState.currentPlayer) {
                    return (
                      <Fragment key={index}>
                        <Button>
                          {player.username} <br />
                        </Button>
                      </Fragment>
                    );
                  }
                  return (
                    <Fragment key={index}>
                      <Button>
                        Yourself <br />
                      </Button>
                    </Fragment>
                  );
                })}
              </Col>
            </Row>
          </Col>
          <Col xs>
            <div>Players Turn {gameState.currentPlayer + 1}</div>
            <ShowPlayer
              player={gameState.players[gameState.currentPlayer]}
              onCardClick={(card, index) => {
                selectedCard.current = { card, index };
                triggerEventToServer(card, index);
              }}
            />
            {/* <ShowPlayer items={gameState.players[0]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowPlayer items={gameState.players[1]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowPlayer items={gameState.players[2]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            <br />
            <Row>
              <Col>
                <Button onClick={handleRotateCard}>Rotate Card</Button>
              </Col>
              <Col>
                <Button onClick={handlePassTurn}>Pass Turn</Button>
              </Col>
            </Row>

            <br />
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
