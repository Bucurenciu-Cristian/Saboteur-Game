import { useState } from 'react';
import Square from '@components/Square';
import { Button } from 'react-bootstrap';

function ShowPlayer({ player, onCardClick }) {
  const [showBack, setShowBack] = useState(true);

  const roleCard = showBack ? player?.role : { ...player?.role, back: undefined };

  return (
    <>
      <p>
        Your name is <Button>{player?.username}</Button>
      </p>

      <p>Your Role</p>
      <div className="board-row">
        <Square
          Card={roleCard}
          row={0}
          column={0}
          Occupied
          onClick={() => {
            setShowBack(false);
            setTimeout(() => {
              setShowBack(true);
            }, 5000);
          }}
        />
      </div>
      {showBack && <p>Click on the Card to reveal Your Role</p>}
      <p>Your Hand</p>
      <div className="board-row">
        {player?.hand?.map((item, i) => (
          <Square Card={item} key={i} row={i} column={0} Occupied onClick={() => onCardClick(item, i)} />
        ))}
      </div>
      {/* <p>Your Rewards</p> */}
      <div className="board-row" />
    </>
  );
}

export default ShowPlayer;
