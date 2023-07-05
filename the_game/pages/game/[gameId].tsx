import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSocket from '@hooks/useSocket';
import { Alert, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import ShowPlayer from '@components/ShowPlayer';
import { changeOrientation } from '@src/BusinessLogic/ChangeOrientation';
import { Modes } from '@src/enums';
import ShowBoard from '@components/ShowBoard';
import Square from '@components/Square';
import { CardTypes } from '@src/data/cards';

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

export function getCardCondition(card, index: number, mode: Modes) {
  return card.code[index] === mode;
}

function DisplayBlocks(props: { player: any; element: (item, i) => JSX.Element }) {
  return <>{props.player?.blocks?.map(props.element)}</>;
}

function getPlayerId(context) {
  return context.currentPlayer;
}

function GameId() {
  const socket = useSocket();

  const [context, setContext] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [validCoordinates, setValidCoordinates] = useState([]);
  const [state, setState] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ card: null, index: -1 });
  const [selectedSquare, setSelectedSquare] = useState({ row: -1, column: -1 });

  const canvasRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();
  let { gameId } = router.query;
  gameId = Number(gameId);
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

    socket.on('GAME_STATE_UPDATE', ({ context, value }) => {
      setContext(context);
      setState(value);
      setValidCoordinates([]);
    });
    socket.on('validCoordinates', (coordinates) => {
      if (
        getCardCondition(coordinates.card, 1, Modes.Path) ||
        getCardCondition(coordinates.card, 2, Modes.Map) ||
        getCardCondition(coordinates.card, 2, Modes.Destroy)
      ) {
        setValidCoordinates(coordinates.valid);
      } else {
        setValidCoordinates([]);
      }
    });
  }, [socket]);

  const resetSelectedCard = () => {
    setSelectedCard({ card: null, index: -1 });
  };

  const handlePathTurn = useCallback(
    (row, column, card) => {
      // const theCard = selectedCard.current.card;
      const theCard = card.card; // Use selectedCard from state directly
      // console.log('theCard', theCard);
      // console.log(row, column, card, 'Yollo');
      if (theCard) {
        if (getCardCondition(theCard, 1, Modes.Path)) {
          socket.emit('placeCard', {
            gameId,
            card: theCard,
            row,
            column,
            handIndex: selectedCard.index,
            playerId: getPlayerId(context),
          });

          // Reset the selected card
          // selectedCard.current = { card: null, index: -1 };
          resetSelectedCard();
        } else if (getCardCondition(theCard, 2, Modes.Map) || getCardCondition(theCard, 2, Modes.Destroy)) {
          socket.emit('placeActionOnTable', {
            gameId,
            card: theCard,
            row,
            column,
            // handIndex: selectedCard.current.index,
            handIndex: selectedCard.index,
            playerId: getPlayerId(context),
          });
          if (getCardCondition(theCard, 2, Modes.Map)) {
            setSelectedSquare({ row, column });
          }
          resetSelectedCard();
        } else if (getCardCondition(theCard, 1, Modes.Action)) {
          alert("You can't place an action card the table.");
        }
      } else {
        // console.log('No card selected');
        resetSelectedCard();
        setValidCoordinates([]);
      }
    },
    [selectedCard]
  );
  const handlePassTurn = () => {
    if (selectedCard.card) {
      // if (selectedCard.current.card) {
      // Emit the event to the server
      socket.emit('passTurn', {
        gameId,
        handIndex: selectedCard.index,
        // handIndex: selectedCard.current.index,
      });

      // Reset the selected card
      resetSelectedCard();
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
    // const { card } = selectedCard.current;
    const { card } = selectedCard;
    // console.log('card', card);
    if (card) {
      if (getCardCondition(card, 1, Modes.Action)) {
        alert("You can't rotate an action card.");
        // selectedCard.current = { card: null, index: -1 };
        resetSelectedCard();

        return;
      }
      // Rotate the card
      // const rotatedCode = changeOrientation(selectedCard.current.card.code);
      // console.log('card.code', card.code);
      const rotatedCode = changeOrientation(card.code);
      // console.log('rotatedCode', rotatedCode);
      // Create a new object to avoid mutating the original card object
      const rotatedCard = {
        // ...selectedCard.current.card,
        ...selectedCard.card,
        code: rotatedCode,
      };
      // console.log('rotatedCard', rotatedCard);

      // Update the selected card and the player's hand
      // selectedCard.current = { ...selectedCard.current, card: rotatedCard };
      setSelectedCard({ ...selectedCard, card: rotatedCard });

      // Make a copy of the game state and update the player's hand
      const newGameState = { ...context };
      // newGameState.players[newGameState.currentPlayer].hand[selectedCard.current.index] = rotatedCard;
      newGameState.players[newGameState.currentPlayer].hand[selectedCard.index] = rotatedCard;

      // Update the game state
      setContext(newGameState);
      setValidCoordinates([]);
      // triggerEventToServer(rotatedCard, selectedCard.current.index);
      triggerEventToServer(rotatedCard, selectedCard.index);
    } else {
      alert('Please select a card first to rotate it.');
    }
  };
  const handleActionTurnYourself = (selectedPlayer) => {
    // const theCard = selectedCard.current.card;
    const theCard = selectedCard.card;

    if (theCard) {
      if (getCardCondition(theCard, 1, Modes.Action)) {
        if (
          getCardCondition(theCard, 3, Modes.True) ||
          theCard.code.includes(Modes.AxeAndCart) ||
          theCard.code.includes(Modes.AxeAndLantern) ||
          theCard.code.includes(Modes.LanternAndCart)
        ) {
          // Here you have to check that the player have an entry in the blocks array
          socket.emit('actionTurnOthers', {
            gameId,
            card: theCard,
            handIndex: selectedCard.index,
            // handIndex: selectedCard.current.index,
            playerId: getPlayerId(context),
            selectedPlayer, // Add the selected player data here
          });
          // Reset the selected card
          // selectedCard.current = { card: null, index: -1 };
          resetSelectedCard();
        } else {
          // console.log('You selected an action card but not Map or Destroy');
          alert('You selected an action card but not Map or Destroy');
        }
      }
    } else {
      alert('You can place only actions on Players');
    }
  };
  const handleActionTurnOthers = (selectedPlayer) => {
    // const theCard = selectedCard.current.card;
    const theCard = selectedCard.card;
    if (theCard) {
      if (getCardCondition(theCard, 1, Modes.Action)) {
        if (!(getCardCondition(theCard, 2, Modes.Map) || getCardCondition(theCard, 2, Modes.Destroy))) {
          socket.emit('actionTurnOthers', {
            gameId,
            card: theCard,
            // handIndex: selectedCard.current.index,
            handIndex: selectedCard.index,
            playerId: getPlayerId(context),
            selectedPlayer, // Add the selected player data here
          });
          // Reset the selected card
          resetSelectedCard();
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
    // selectedCard.current = { card, index };
    setSelectedCard({ card, index });
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
  // useEffect(() => {
  //   console.log('selectedCard changed:', selectedCard);
  // }, [selectedCard]);

  useEffect(() => {
    if (selectedSquare.row !== -1 && selectedSquare.column !== -1) {
      const timer = setTimeout(() => {
        setSelectedSquare({ row: -1, column: -1 });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [selectedSquare]);
  useEffect(() => {
    if (selectedCard.card === null && selectedCard.index === -1) {
      setValidCoordinates([]);
    }
  }, [selectedCard]);
  const [showBack, setShowBack] = useState(true);

  const roleCard = showBack
    ? context?.players[getPlayerId(context)]?.role
    : { ...context?.players[getPlayerId(context)]?.role, back: undefined };

  return (
    <>
      {/* <div> */}
      {/* Game ID: {gameId}, Status: {state}, Round: {context && context.round}, */}
      {/* Turn: {context && getPlayerId(context) + 1} */}
      {/* </div> */}
      {context && (
        <div
        // className={"bg-white bg-opacity-25 px-0"}
        >
          <Row
          // className={"px-0 mx-0"}
          >
            <Col
              xs={12}
              lg={7}
              xl={7}
              xxl={7}
              // className={"py-3 px-0 bg-white bg-opacity-25"}
            >
              <ShowBoard
                validCoordinates={validCoordinates}
                gameMatrix={context.gameBoard}
                onBoardSquareClick={(row, column) => handlePathTurn(row, column, selectedCard)}
                selectedCard={selectedCard}
                selectedSquare={selectedSquare}
              />
            </Col>
            <Col
              xxl
              xs
              sm
              md
              lg
              xl
              // className={"py-3 bg-white bg-opacity-10"}
            >
              <Row>
                <Col>
                  <h1>Players Turn {getPlayerId(context) + 1}</h1>
                </Col>
                {/* <Col> */}
                {/*  <Offcanvas show={show} onHide={handleClose}> */}
                {/*    <Offcanvas.Header closeButton> */}
                {/*      <Offcanvas.Title>GameLog</Offcanvas.Title> */}
                {/*    </Offcanvas.Header> */}
                {/*    <Offcanvas.Body> */}
                {/*      {context.gameLogs.map((log, index) => ( */}
                {/*        <p key={index}>{JSON.stringify(log)}</p> */}
                {/*      ))} */}
                {/*    </Offcanvas.Body> */}
                {/*  </Offcanvas> */}
                {/* </Col> */}
              </Row>
              <div>
                {state === 'score' && <p>This round is finished</p> && <Button onClick={StartNewGame}>Start a new Game</Button>}{' '}
              </div>
              <ShowPlayer
                player={context.players[getPlayerId(context)]}
                onCardClick={onCardClick}
                currentCard={selectedCard.card}
                resetSelectedCard={resetSelectedCard}
              />
              <Row>
                <>
                  <hr className="border border-5 border-dark" />
                  <Col>
                    <div className="board-row">
                      <Square
                        Card={roleCard}
                        row={0}
                        column={0}
                        Occupied
                        style="square-role"
                        onClick={() => {
                          setShowBack(false);
                          setTimeout(() => {
                            setShowBack(true);
                          }, 5000);
                        }}
                      />
                    </div>
                    {showBack && !selectedCard.card && <p>Click on the Card to reveal Your Role</p>}
                  </Col>
                  <Col>
                    {selectedCard.card && (
                      <div className="board-row">
                        <Square
                          onClick={resetSelectedCard}
                          Card={selectedCard.card}
                          key={0}
                          row={0}
                          column={0}
                          Occupied
                          style="square-current-card"
                        />
                      </div>
                    )}
                  </Col>
                </>
                <Col>
                  {context.deck.length > 0 && (
                    <>
                      <div>
                        <Square
                          style="square-role"
                          row={0}
                          column={0}
                          Card={{ back: CardTypes.BACK_OF_CARDS.PATH_OR_ACTION }}
                          Occupied
                        />
                      </div>
                      <p>Deck has {context.deck.length} cards</p>
                    </>
                  )}
                </Col>
                <Col>
                  {' '}
                  {context.discardPile.length > 0 && (
                    <>
                      <div className="board-row">
                        <Square style="square-role" Card={{ back: CardTypes.BACK_OF_CARDS.PATH_OR_ACTION }} Occupied />
                      </div>
                      <p>Graveyard has {context.discardPile.length} cards</p>
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {selectedCard?.card?.code[1] === Modes.Path && (
                    <Button className="w-100 btn-info p-1" onClick={handleRotateCard}>
                      Rotate Card
                    </Button>
                  )}
                </Col>
                <Col>
                  {selectedCard?.card && (
                    <Button className="w-100 btn-warning p-1" onClick={handlePassTurn}>
                      Pass Turn
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                {context.serverText !== '' && (
                  <Col>
                    {' '}
                    <Alert variant="danger">
                      Feedback from the server: <p>{context.serverText}</p>
                    </Alert>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="my-3">
                {context.players.map((player, index) => {
                  if (index !== getPlayerId(context)) {
                    return (
                      // <Col key={index}>
                      <Col key={index}>
                        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('Play Actions')}>
                          <Button className="w-100 my-3 btn-lg p-3" onClick={() => handleActionTurnOthers(player)}>
                            <h1>{player.username}</h1>
                          </Button>
                        </OverlayTrigger>
                        <Row>
                          <DisplayBlocks
                            player={player}
                            element={(item, i) => (
                              <Col xs={2}>
                                <Square Card={item} key={i} row={i} column={0} Occupied style="square-actions" />
                              </Col>
                            )}
                          />
                        </Row>
                      </Col>
                    );
                  }
                  return (
                    // <Col key={index}>
                    <Col key={index}>
                      <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('Play Actions')}>
                        <Button
                          className="w-100 my-3 p-3 btn-lg"
                          variant="success"
                          onClick={() => handleActionTurnYourself(player)}
                        >
                          <h1>Yourself</h1>
                        </Button>
                      </OverlayTrigger>
                      <Row>
                        <DisplayBlocks
                          player={player}
                          element={(item, i) => (
                            <Col xs={2}>
                              <Square Card={item} key={i} row={i} column={0} Occupied style="square-actions" />
                            </Col>
                          )}
                        />
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default GameId;
