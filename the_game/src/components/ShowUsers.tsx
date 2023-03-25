import React from 'react';
import Square from './Square';
import { IUser } from '../Types/Players';

function ShowUsers({ items, moveItemToMatrix }: { items: IUser; moveItemToMatrix: any; onCardClick: any }) {
  return (
    <>
      <div className="board-row">
        {items.hand.map((item, i) => (
          <Square
            Card={item}
            key={i}
            row={i}
            column={0}
            Occupied
            onClick={() => {
              moveItemToMatrix(i, 0, 0);
              console.log(`Locatia cartii din mana este: [${i}]`);
            }}
          />
        ))}
      </div>
      {/* {users.map((user, i) => {
                            return (<div key={i} className="board-row">
                                <br/>
                                <h3>{user.UserName}</h3>
                                {
                                    user.Hand.map((card, j) => {
                                        return (
                                            <div key={`${i}${j}`}>
                                                <Square
                                                    Card={card}
                                                    Occupied={true}
                                                    onClick={() => {
                                                        console.log(`Locatia cartii din mana este: [${i},${j}]`);
                                                        // items(i, j);
                                                        console.log(`Cartea este: ${info(card.code)}`);
                                                        console.log(`Userul este: ${user.UserName}`);
                                                    }
                                                    }/>
                                            </div>
                                        );
                                    })
                                }
                            </div>)
                        })} */}
    </>
  );
}

export default ShowUsers;
