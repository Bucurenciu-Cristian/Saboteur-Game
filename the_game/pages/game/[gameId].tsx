import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSocket from '@hooks/useSocket';
import { Button, Col, Row } from 'react-bootstrap';
import ShowUsers from '@components/ShowUsers';
import ShowBoard from '@components/ShowBoard';

async function checkRoomExists(gameId: number) {
  const response = await fetch(`/api/room/${gameId}/players`);
  const data = await response.json();
  return data;
}

function GameId() {
  const router = useRouter();
  let { gameId } = router.query;
  gameId = Number(gameId);
  const [gameState, setGameState] = useState(null);
  const socket = useSocket();
  useEffect(() => {
    if (!gameId) return;
    (async () => {
      const roomExists = await checkRoomExists(gameId);
      if (roomExists.length === 0) {
        router.push('/'); // Redirect to the home page if the room doesn't exist
      }
    })();
  }, [gameId, router]);

  useEffect(() => {
    if (!socket || !gameId) return;

    // Join the room with the given gameId
    socket.emit('join', gameId);

    socket.on('GAME_STATE_UPDATE', (data) => {
      console.log('GAME_STATE_UPDATE_CLIENT', data);
      setGameState(data);
    });

    // Ce poate sa faca un client?
    // Sa trimita la server urmatoarele event-uri: playPath, playAction,

    // trebuie sa arat si a cui e randul in momentul actual. Ca ceilalti sa astepte.
    // socket.emit('playPath');
    socket.emit('playAction');

    return () => {
      socket.emit('leave', gameId);
    };
  }, [socket, gameId]);

  // Listen for server updates and update the client state accordingly
  useEffect(() => {}, [socket]);
  // Render the component based on the client state
  return (
    <>
      <Row>
        <div>Game ID: {gameId}</div>
      </Row>
      {gameState && (
        <Row>
          <Col xs={9}>
            <ShowBoard gameMatrix={gameState.gameBoard} />
            <Row>
              <Col>
                <p> Player {gameState.currentPlayer} has control </p>
                The deck has {gameState.deck.length} cards
                <Button>Reset Game</Button>
              </Col>
              <Col>
                <Button>Rotate Card</Button>
              </Col>
              <Col>
                <Button>Pass</Button>
              </Col>
              <Col>
                <Button>End Turn</Button>
                {/* <Button>End Game</Button> */}
                {/* <Button>Leave Game</Button> */}
                {/* <Button>Quit</Button> */}
                {/* <Button>Restart Game</Button> */}
                {/* <Button>Save Game</Button> */}
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <div>Players</div>
            <ShowUsers items={gameState.players[0]} />
            <ShowUsers items={gameState.players[1]} />
            <ShowUsers items={gameState.players[2]} />
          </Col>
        </Row>
      )}
    </>
  );
}

export default GameId;
