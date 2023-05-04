import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useSocket from '@hooks/useSocket';
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import ShowPlayer from '@components/ShowPlayer';
import { changeOrientation } from '@src/BusinessLogic/ChangeOrientation';
import Square from '@components/Square';
import { CardTypes } from '@src/data/cards';
import ShowBoard from '@components/ShowBoard';

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

export function getCardCondition(card, index: number, mode: string) {
  return card.code[index] === mode;
}

function DisplayBlocks(props: { player: any; element: (item, i) => JSX.Element }) {
  return <p>{props.player?.blocks?.map(props.element)}</p>;
}

function GameId() {
  const socket = useSocket();

  const [context, setContext] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [validCoordinates, setValidCoordinates] = useState([]);
  const [state, setState] = useState(null);
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
      setContext(data.context);
      setState(data.value);
      setValidCoordinates([]);
    });
    socket.on('validCoordinates', (coordinates) => {
      if (getCardCondition(coordinates.card, 1, 'P')) {
        setValidCoordinates(coordinates.valid);
      } else {
        setValidCoordinates([]);
      }
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
          playerId: context.currentPlayer,
        });

        // Reset the selected card
        selectedCard.current = { card: null, index: -1 };
      } else if (getCardCondition(theCard, 1, 'A')) {
        alert("You can't place an action card the table.");
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
  // Function to trigger event to the server
  const triggerEventToServer = (card, index) => {
    // Trigger the event to the server here
    socket.emit('selectCard', {
      gameId,
      handIndex: index,
      card,
    });
  };
  const handleRotateCard = () => {
    const { card } = selectedCard.current;
    if (card) {
      if (getCardCondition(card, 1, 'A')) {
        alert("You can't rotate an action card.");
        selectedCard.current = { card: null, index: -1 };
        return;
      }

      // Rotate the card
      const rotatedCode = changeOrientation(selectedCard.current.card.code);
      // Create a new object to avoid mutating the original card object
      const rotatedCard = {
        ...selectedCard.current.card,
        code: rotatedCode,
      };

      // Update the selected card and the player's hand
      // setSelectedCard({ ...selectedCard, card: rotatedCard });
      selectedCard.current = { ...selectedCard.current, card: rotatedCard };
      // Make a copy of the game state and update the player's hand
      const newGameState = { ...context };
      newGameState.players[newGameState.currentPlayer].hand[selectedCard.current.index] = rotatedCard;

      // Update the game state
      setContext(newGameState);
      setValidCoordinates([]);
      triggerEventToServer(rotatedCard, selectedCard.current.index);
    } else {
      alert('Please select a card first to rotate it.');
    }
  };
  const handleActionTurnYourself = () => {
    const theCard = selectedCard.current.card;
    if (theCard) {
      if (getCardCondition(theCard, 1, 'A')) {
        if (getCardCondition(theCard, 2, 'M')) {
          console.log('Map');
        } else if (getCardCondition(theCard, 2, 'D')) {
          console.log('Destroy');
        } else {
          console.log('You selected an action card but not Map or Destroy');
          alert('You selected an action card but not Map or Destroy');
        }
      } else {
        alert('You can place only actions on Players');
      }
    }
  };
  const handleActionTurnOthers = (selectedPlayer) => {
    const theCard = selectedCard.current.card;
    if (theCard) {
      if (getCardCondition(theCard, 1, 'A')) {
        if (!(getCardCondition(theCard, 2, 'M') || getCardCondition(theCard, 2, 'D'))) {
          socket.emit('actionTurnOthers', {
            gameId,
            card: theCard,
            handIndex: selectedCard.current.index,
            playerId: context.currentPlayer,
            selectedPlayer, // Add the selected player data here
          });
          // Reset the selected card
          selectedCard.current = { card: null, index: -1 };
          console.log(JSON.stringify(theCard));
        } else {
          alert("You can't play Map or Destroy on other players");
        }
      } else {
        alert('You can place only actions on Players');
      }
    } else {
      alert("You don't have an action card selected");
    }
  };

  const StartNewGame = () => {
    socket.emit('startNewGame', {
      gameId,
    });
  };
  // Render the component based on the client state
  const onCardClick = (card, index) => {
    selectedCard.current = { card, index };
    triggerEventToServer(card, index);
  };
  const renderTooltip = (text) =>
    function (props) {
      return (
        <Tooltip id={`button-tooltip-${text}`} {...props}>
          {text}
        </Tooltip>
      );
    };

  return (
    <>
      <Row>
        <div>
          Game ID: {gameId}, Status: {state}, Round: {context && context.round}, Turn: {context && context.currentPlayer + 1}
          {state === 'score' && <Button onClick={StartNewGame}>Start a new Game</Button>}{' '}
        </div>
      </Row>
      {context && (
        <Row>
          <Col xs={8}>
            Play Actions on: <br />
            <Row>
              {context.players.map((player, index) => {
                if (index !== context.currentPlayer) {
                  return (
                    <Col key={index}>
                      <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={renderTooltip('Other Actions')}>
                        <>
                          <Button className="w-75" onClick={() => handleActionTurnOthers(player)}>
                            {player.username}
                          </Button>
                          <DisplayBlocks
                            player={player}
                            element={(item, i) => <Square Card={item} key={i} row={i} column={0} Occupied />}
                          />
                        </>
                      </OverlayTrigger>
                    </Col>
                  );
                }
                return (
                  <Col key={index}>
                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 200 }} overlay={renderTooltip('Map or Action')}>
                      <>
                        <Button className="w-75" onClick={handleActionTurnYourself}>
                          Yourself
                        </Button>
                        <DisplayBlocks
                          player={player}
                          element={(item, i) => <Square Card={item} key={i} row={i} column={0} Occupied />}
                        />
                      </>
                    </OverlayTrigger>
                  </Col>
                );
              })}
            </Row>
            <br />
            <ShowBoard
              validCoordinates={validCoordinates}
              gameMatrix={context.gameBoard}
              onBoardSquareClick={(row, column) => handlePathTurn(row, column)}
            />
            <Row>
              <Col>
                {context.deck.length > 0 && (
                  <>
                    <p>The Deck has {context.deck.length} cards</p>
                    <div className="board-row">
                      <Square row={0} column={0} Card={{ back: CardTypes.BACK_OF_CARDS.PATH_OR_ACTION }} Occupied />
                    </div>
                  </>
                )}
              </Col>
              <Col>
                {' '}
                {context.discardPile.length > 0 && (
                  <>
                    <p>Graveyard has {context.discardPile.length} cards</p>
                    <div className="board-row">
                      <Square Card={{ back: CardTypes.BACK_OF_CARDS.PATH_OR_ACTION }} Occupied />
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs>
            <div>Players Turn {context.currentPlayer + 1}</div>
            <ShowPlayer
              player={context.players[context.currentPlayer]}
              onCardClick={onCardClick}
              currentCard={selectedCard.current.card}
            />
            {/* <ShowPlayer items={context.players[0]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowPlayer items={context.players[1]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
            {/* <ShowPlayer items={context.players[2]} onCardClick={(card, index) => setSelectedCard({ card, index })} /> */}
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
