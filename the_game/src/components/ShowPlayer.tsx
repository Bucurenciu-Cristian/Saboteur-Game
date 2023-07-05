import Square from '@components/Square';
import { Col, Row } from 'react-bootstrap';

function ShowPlayer({ player, onCardClick, currentCard, resetSelectedCard }) {
  return (
    <Row>
      <Col key={1}>
        <h1>Your Hand</h1>

        <Row>
          {player?.hand?.map((item, i) => (
            <Col xs={4} key={i} className="my-2">
              <Square Card={item} key={i} row={i} column={0} Occupied onClick={() => onCardClick(item, i)} style="square-hands" />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default ShowPlayer;
