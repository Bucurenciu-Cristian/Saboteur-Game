import { useState } from 'react';
import Square from '@components/Square';
import { Col, Row } from 'react-bootstrap';

function ShowPlayer({ player, onCardClick, currentCard, resetSelectedCard }) {
  const [showBack, setShowBack] = useState(true);

  const roleCard = showBack ? player?.role : { ...player?.role, back: undefined };

  return (
    <Row>
      <Col>
        <p>Your Hand</p>
        <Row>
          {player?.hand?.map((item, i) => (
            <Col xs={4}>
              <Square Card={item} key={i} row={i} column={0} Occupied onClick={() => onCardClick(item, i)} style="square-hands" />
            </Col>
          ))}
        </Row>
      </Col>
      <Col>
        <>
          {!currentCard && <span>Your name is</span>}
          <h1>{player?.username}</h1>
        </>
        {/* <p>Your Rewards</p> */}
        {/* <div className="board-row" /> */}

        <Row>
          <>
            <Col>
              {!currentCard && <p>Your Role</p>}
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
              {showBack && !currentCard && <p>Click on the Card to reveal Your Role</p>}
            </Col>
            <Col>
              {currentCard && (
                <div className="board-row">
                  <Square
                    onClick={resetSelectedCard}
                    Card={currentCard}
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
        </Row>
      </Col>
    </Row>
  );
}

export default ShowPlayer;
