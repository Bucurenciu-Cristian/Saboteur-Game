import Square from "./Square";
import {Col} from "react-bootstrap";
import React from "react";
import {IUser} from "../Types/Players";

const ShowUsers = ({items, moveItemToMatrix}
                       : {
    items: IUser,
    moveItemToMatrix: any,
    onCardClick: any
}) => {
    return (
        <>
            <Col md={2}>
                <div className="board-row">
                    {items.Hand.map((item, i) => {
                        return (
                            <Square
                                Card={item}
                                key={i}
                                row={i}
                                column={0}
                                Occupied={true}
                                onClick={
                                    () => {
                                        moveItemToMatrix(i, 0, 0);
                                        console.log(`Locatia cartii din mana este: [${i}]`);
                                    }
                                }
                            />
                        );
                    })}
                </div>
                <div>

                </div>

                {/*{users.map((user, i) => {
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
                        })}*/}
            </Col>
        </>);
}
export default ShowUsers;
